import { Request, Response } from "express";
import { v4 as uid } from "uuid";

import { pool } from "../../config/db.config";
import { Users } from "../models/users.models";
import { Loans, LoanStatus } from "../models/loans.models";
import { loanSchema } from "../validators/loan.validators";

//BUG: major bug will add loan for entire length of loans array.
//Break it and build from scratch. Too many if...else are confusing
//reduce those.
export async function applyLoan(request: Request, response: Response) {
  /*
   * admin applies on behalf of member. A member recives loan if:
   * 1.)they are active. 2.) no pending loan application,
   * laon will default to pending after submission.
   */
  const id = uid();
  const {
    admin_id,
    user_id,
    microfinance_id,
    type,
    amount,
    interest_rate,
    repayment_period,
    guarantor_details,
  } = request.body;

  try {
    const { error } = loanSchema.validate(request.body);
    if (error) {
      return response.status(422).json({
        code: 422,
        status: "error",
        message: "Validation error occurred",
        data: {
          path: error.details[0].path[0],
          error: error.details[0].message,
        },
        metadata: null,
      });
    }
    //if no validation error
    const connection = await pool.getConnection();
    const [rows]: any = await connection.execute(`CALL getUserById(?);`, [
      admin_id,
    ]);
    const user = rows[0] as Users[];
    connection.release();

    // NOTE: 1st if check -> ensure user applying is an admin
    if (user[0].role == "admin") {
      const [rows]: any = await connection.execute(`CALL getUserById(?);`, [
        user_id,
      ]);
      const applicant_user = rows[0] as Users[];
      connection.release();

      //NOTE: 2nd if check -> ensure user being applied for is active
      if (applicant_user.length > 0 && applicant_user[0].status == "active") {
        // ensure no pending loans
        const [results]: any = await connection.execute(
          `CALL getUserLoansById(?);`,
          [user_id],
        );
        const loans = results[0] as Loans[];
        connection.release();

        //NOTE: 3rd if check -> check if active member has any loans
        if (loans.length > 0) {
          //NOTE:loops through loans array
          for (let i = 0; i < loans.length; i++) {
            //NOTE: 4th if check -> if any is pending, no loan
            if (loans[i].status == "pending") {
              return response.status(403).json({
                code: 403,
                status: "error",
                message: "Forbidden. User has pending loans",
                data: {
                  users: {
                    id: applicant_user[0].id,
                    microfinance_id: applicant_user[0].microfinance_id,
                    username: applicant_user[0].username,
                    email: applicant_user[0].email,
                    role: applicant_user[0].role,
                    status: applicant_user[0].status,
                  },
                  loans: { loans },
                },
                metadata: null,
              });
              //NOTE:close 4th if check -> if loans exist, but none is existing, issue loans
            } else {
              const [rows]: any = await connection.execute(
                `CALL addLoan(?,?,?,?,?,?,?,?);`,
                [
                  id,
                  user_id,
                  microfinance_id,
                  type,
                  amount,
                  interest_rate,
                  repayment_period,
                  guarantor_details,
                ],
              );
              const user_loan = rows[0] as Loans[];
              connection.release();

              return response.status(201).json({
                code: 201,
                status: "success",
                message: "Loan successfully created",
                data: {
                  users: {
                    id: applicant_user[0].id,
                    microfinance_id: applicant_user[0].microfinance_id,
                    username: applicant_user[0].username,
                    email: applicant_user[0].email,
                    role: applicant_user[0].role,
                    status: applicant_user[0].status,
                  },
                  loans: {
                    id: user_loan[0].id,
                    user_id: user_loan[0].user_id,
                    microfinance_id: user_loan[0].microfinance_id,
                    amount: user_loan[0].amount,
                    status: user_loan[0].status,
                    disbursment_date: user_loan[0].disbursment_date,
                    guarantor_details: user_loan[0].guarantor_details,
                  },
                },
                metadata: null,
              });
            }
          }
        } else {
          //NOTE: close 3rd if check -> if user status="active" and no loans
          // issue the loans
          await connection.execute(`CALL addLoan(?,?,?,?,?,?,?,?);`, [
            id,
            user_id,
            microfinance_id,
            type,
            amount,
            interest_rate,
            repayment_period,
            guarantor_details,
          ]);
          const user_loan = rows[0] as Loans[];
          connection.release();

          return response.status(201).json({
            code: 201,
            status: "success",
            message: "Loan successfully created",
            data: {
              users: {
                id: applicant_user[0].id,
                microfinance_id: applicant_user[0].microfinance_id,
                username: applicant_user[0].username,
                email: applicant_user[0].email,
                role: applicant_user[0].role,
                status: applicant_user[0].status,
              },
            },
            metadata: null,
          });
        }
      } else {
        // NOTE: close 2nd if check -> if user status is pending.
        // or array length is 0. no loan
        return response.status(403).json({
          code: 403,
          status: "error",
          message: "Forbidden. User does not exist or has a pending status.",
          data: {
            users: {
              id: applicant_user[0].id,
              microfinance_id: applicant_user[0].microfinance_id,
              username: applicant_user[0].username,
              email: applicant_user[0].email,
              role: applicant_user[0].role,
              status: applicant_user[0].status,
            },
          },
        });
      }
    } else if (user[0].role == "member" || user[0].role == "support") {
      // NOTE: close 1st if check -> not an admin initiating action. no loans
      return response.status(401).json({
        code: 401,
        status: "error",
        message: "Unauthorized. Only admins can apply for loans",
        data: {
          users: {
            id: user[0].id,
            microfinance_id: user[0].microfinance_id,
            username: user[0].username,
            email: user[0].email,
            role: user[0].role,
            status: user[0].status,
          },
        },
        metadata: null,
      });
    } else {
      //NOTE: error check 1st if check-> if user does not exist. no loans
      return response.status(404).json({
        code: 422,
        status: "error",
        message: "User not found",
        data: null,
        metadata: null,
      });
    }
  } catch (error) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Server error",
      data: { error },
      metadata: null,
    });
  }
}

export async function getLoans(request: Request, response: Response) {
  /*
   * view list of all pending loan applications.
   */

  try {
    const connection = await pool.getConnection();
    const [rows]: any = await connection.execute(`CALL getAllLoans();`);
    connection.release();
    const loans = rows[0] as Loans[];

    if (loans.length > 0) {
      const [results]: any = await connection.execute(
        `CALL getDetailedLoans();`,
      );
      connection.release();
      const detailed_loans = results[0] as Loans[];
      return response.status(200).json({
        code: 200,
        status: "success",
        message: "Successfully retrieved all loans",
        data: { detailed_loans },
        metadata: null,
      });
    }
    // else if currently no loans in system
    return response.status(404).json({
      code: 404,
      status: "error",
      message: "No loans found",
      data: null,
      metadata: null,
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Server error",
      data: { error },
      meatdata: null,
    });
  }
}
