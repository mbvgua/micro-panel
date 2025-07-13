import { Request, Response } from "express";
import { v4 as uid } from "uuid";

import { pool } from "../../config/db.config";
import { Users } from "../models/users.models";
import { Loans, LoanStatus } from "../models/loans.models";
import { loanSchema } from "../validators/loan.validators";

export async function applyLoan(request: Request, response: Response) {
  /*
   * admin applies on behalf of member. A member recives loan if:
   * 1.)they are active. 2.) no pending loan application,
   * laon will default to pending after submission.
   */
  const id = uid();
  const {
    user_id,
    sacco_id,
    loan_type,
    loan_amount,
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
        metadata: {},
      });
    }
    //if no validation error
    const connection = await pool.getConnection();
    const [rows]:any = await connection.execute(`CALL getUserById(?);`, [user_id]);
    const user = rows[0] as Users[];
    connection.release();

    if (user.length > 0) {
      //ensure user status is active
      if (user[0].user_status == "active") {
        // ensure no pending loans
        const [results]:any = await connection.execute(
          `CALL getUserLoansById(?);`,
          [user_id],
        );
        const loans = results[0] as Loans[];
        connection.release();

        //check if user has pending loans
        if (loans) {
          // loop through all user loans to see if any is pending
          for (let i = 0; i < loans.length; i++) {
            // if any is pending
            if (loans[i].loan_status == "pending") {
              return response.status(403).json({
                code: 403,
                status: "error",
                message: "Forbidden. User has pending loans",
                data: {
                  user_name: user[0].user_name,
                  user_email: user[0].user_email,
                  user_loans: loans,
                },
                metadata: {},
              });
            } else {
              // else if none is pending
              const [rows]:any = await connection.execute(
                `CALL addLoan(?,?,?,?,?,?,?,?);`,
                [
                  id,
                  user_id,
                  sacco_id,
                  loan_type,
                  loan_amount,
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
                  user_id: user[0].id,
                  user_email: user[0].user_email,
                  loan_id: user_loan[0].id,
                  loan_status: user_loan[0].loan_status,
                },
                metadata: {},
              });
            }
          }
        }

        //else issue loan
        const [rows]:any = await connection.execute(
          `CALL addLoan(?,?,?,?,?,?,?,?);`,
          [
            id,
            user_id,
            sacco_id,
            loan_type,
            loan_amount,
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
            user_id: user[0].id,
            user_email: user[0].user_email,
            loan_id: user_loan[0].id,
            loan_status: user_loan[0].loan_status,
          },
          metadata: {},
        });
      } else {
        // else if user status is pending
        return response.status(403).json({
          code: 403,
          status: "error",
          message: "Forbidden. User cannot apply for loan",
          data: {
            user_id: user[0].id,
            user_role: user[0].user_role,
            user_status: user[0].user_status,
          },
        });
      }
    } else {
      // else if user does not exist
      return response.status(404).json({
        code: 422,
        status: "error",
        message: "User not found",
        data: {},
        metadata: {},
      });
    }
  } catch (error) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Server error",
      data: error,
      metadata: {},
    });
  }
}

export async function getLoans(request: Request, response: Response) {
  /*
   * view list of all pending loan applications.
   * use either a view or a join.
   */

  try {
    const connection = await pool.getConnection();
    const [rows]:any = await connection.execute(`CALL getAllLoans();`);
    connection.release();
    const loans = rows[0] as Loans[];

    if (loans.length > 0) {
      const [results]:any = await connection.execute(`CALL detailedLoans();`);
      connection.release();
      const detailed_loans = results[0] as Loans[];
            console.log(detailed_loans)

      return response.status(200).json({
        code: 200,
        status: "success",
        message: "Successfully retrieved all loans",
        data: detailed_loans,
        metadata: {},
      });
    }
    // else if currently no loans in system
    return response.status(404).json({
      code: 404,
      status: "error",
      message: "No loans found",
      data: {},
      metadata: {},
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Server error",
      data: error,
      meatdata: {},
    });
  }
}
