import { Request, Response } from "express";
import { v4 as uid } from "uuid";

import { pool } from "../../config/db.config";
import { UserRoles, Users } from "../models/users.models";
import { Loans, LoanStatus } from "../models/loans.models";
import { loanSchema, updateLoanSchema } from "../validators/loan.validators";
import { validationHelper } from "../helpers/validator.helpers";
import {
  response200Helper,
  response201Helper,
  response401Helper,
  response403Helper,
  response404Helper,
  response500Helper,
} from "../helpers/response.helpers";

export async function applyLoan(request: Request, response: Response) {
  /*
   * admin applies on behalf of member. A member recives loan if:
   * 1.)they are active. 2.) no pending loan application,
   * loan will default to pending after submission.
   */
  const id = uid();
  const admin_id = request.params.id;
  const {
    user_id,
    microfinance_id,
    type,
    amount,
    interest_rate,
    repayment_period,
    guarantor_details,
  } = request.body;

  try {
    //validate request body
    validationHelper(request, response, loanSchema);

    //if no validation error get admin user
    const connection = await pool.getConnection();
    const [rows]: any = await connection.execute(`CALL getUserById(?);`, [
      admin_id,
    ]);
    const admin_user = rows[0] as Users[];

    //ensure user applying is an admin
    if (admin_user[0].role == "admin") {
      const [rows]: any = await connection.execute(`CALL getUserById(?);`, [
        user_id,
      ]);
      const applicant_user = rows[0] as Users[];

      if (applicant_user.length > 0 && applicant_user[0].status == "active") {
        // ensure no pending loans
        const [results]: any = await connection.execute(
          `CALL getUserLoansById(?);`,
          [user_id],
        );
        const loans = results[0] as Loans[];
        connection.release();

        // check if active member has any loans
        if (loans.length > 0) {
          // NOTE: loops through loans array see if any is pending
          // evaluate to true if any loan has a pending status,
          // else it evaluetes to false
          const has_pending_loan = loans.some(
            (loan) => loan.status === LoanStatus.pending,
          );

          if (has_pending_loan) {
            const message: string = "Forbidden. User has pending loans";
            const data = {
              users: {
                id: applicant_user[0].id,
                microfinance_id: applicant_user[0].microfinance_id,
                username: applicant_user[0].username,
                email: applicant_user[0].email,
                role: applicant_user[0].role,
                status: applicant_user[0].status,
              },
              loans: { loans },
            };

            return response403Helper(response, message, data);
          } else {
            // if all user loans are approved
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

            const message: string = "Loan successfully created";
            const data = {
              users: {
                id: applicant_user[0].id,
                microfinance_id: applicant_user[0].microfinance_id,
                username: applicant_user[0].username,
                email: applicant_user[0].email,
                role: applicant_user[0].role,
                status: applicant_user[0].status,
              },
            };

            return response201Helper(response, message, data);
          }
        } else {
          // if user status="active" and no loans issue the loans
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

          const message: string = "Loan successfully created";
          const data = {
            users: {
              id: applicant_user[0].id,
              microfinance_id: applicant_user[0].microfinance_id,
              username: applicant_user[0].username,
              email: applicant_user[0].email,
              role: applicant_user[0].role,
              status: applicant_user[0].status,
            },
          };

          return response201Helper(response, message, data);
        }
      } else {
        // if user status is pending. or array length is 0. no loan
        const message: string =
          "Forbidden. User does not exist or has a pending status.";
        const data = {
          users: {
            id: applicant_user[0].id,
            microfinance_id: applicant_user[0].microfinance_id,
            username: applicant_user[0].username,
            email: applicant_user[0].email,
            role: applicant_user[0].role,
            status: applicant_user[0].status,
          },
        };

        return response403Helper(response, message, data);
      }
    } else if (
      admin_user[0].role == "member" ||
      admin_user[0].role == "support"
    ) {
      const message: string = "Unauthorized. Only admins can apply for loans";
      const data = {
        users: {
          id: admin_user[0].id,
          microfinance_id: admin_user[0].microfinance_id,
          username: admin_user[0].username,
          email: admin_user[0].email,
          role: admin_user[0].role,
          status: admin_user[0].status,
        },
      };

      return response401Helper(response, message, data);
    } else {
      const message: string = "User not found";
      const data = null;

      return response404Helper(response, message, data);
    }
  } catch (error) {
    return response500Helper(response, error);
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

      const message: string = "Successfully retrieved all loans";
      const data = { detailed_loans };

      return response200Helper(response, message, data);
    }
    // else if currently no loans in system
    const message: string = "No loans found";
    const data = null;

    return response404Helper(response, message, data);
  } catch (error) {
    return response500Helper(response, error);
  }
}

export async function updateLoan(
  request: Request<{ id: string }>,
  response: Response,
) {
  /*
   * admin updates a loans details
   */
  const admin_id = request.params.id;
  const { loan_id, type, amount, interest_rate, repayment_period } =
    request.body;

  try {
    //validate request body
    validationHelper(request, response, updateLoanSchema);

    //if no validation error
    const connection = await pool.getConnection();
    const [rows]: any = await connection.execute(`CALL getUserById(?);`, [
      admin_id,
    ]);
    const admin_user = rows[0] as Users[];

    if (admin_user.length > 0 && admin_user[0].role == UserRoles.admin) {
      const [rows]: any = await connection.execute(`CALL getLoanById(?);`, [
        loan_id,
      ]);
      const loan_to_be_updated = rows[0] as Loans[];

      //if loan exists and has not bee approved yet
      if (
        loan_to_be_updated.length > 0 &&
        loan_to_be_updated[0].status == LoanStatus.pending
      ) {
        await connection.execute(`CALL updateLoan(?,?,?,?,?);`, [
          loan_id,
          type || loan_to_be_updated[0].type,
          amount || loan_to_be_updated[0].amount,
          interest_rate || loan_to_be_updated[0].interest_rate,
          repayment_period || loan_to_be_updated[0].repayment_period,
        ]);

        const message: string = "Successfully updated loans";
        const data = {
          users: {
            id: admin_user[0].id,
            username: admin_user[0].username,
            email: admin_user[0].email,
            role: admin_user[0].role,
          },
          loans: {
            id: loan_to_be_updated[0].id,
            microfinance_id: loan_to_be_updated[0].microfinance_id,
            amount: loan_to_be_updated[0].amount,
            status: loan_to_be_updated[0].status,
            disbursment_date: loan_to_be_updated[0].disbursment_date,
          },
        };

        return response201Helper(response, message, data);
      } else {
        //else if loan does not exist
        const message: string = "Loan not found or has already been approved";
        const data = {
          loans: {
            id: loan_id,
          },
        };

        return response404Helper(response, message, data);
      }
    } else {
      //else if not an admin user
      const message: string =
        "Unauthorized. Only admins can perform this action";
      const data = {
        users: {
          id: admin_id,
        },
      };

      return response401Helper(response, message, data);
    }
  } catch (error) {
    return response500Helper(response, error);
  }
}

export async function deleteLoan(
  request: Request<{ id: string }>,
  response: Response,
) {
  /*
   * delete a loan from system
   * can only be performed by admin
   */

  const admin_id = request.params.id;
  const { loan_id } = request.body;

  try {
    const connection = await pool.getConnection();
    const [rows]: any = await connection.execute(`CALL getUserById(?);`, [
      admin_id,
    ]);
    const admin_user = rows[0] as Users[];

    if (admin_user.length > 0 && admin_user[0].role == UserRoles.admin) {
      const [rows]: any = await connection.execute(`CALL getLoanById(?);`, [
        loan_id,
      ]);
      const loan = rows[0] as Loans[];

      //if loan exists
      if (loan.length > 0) {
        await connection.execute(`CALL deleteLoan(?);`, [loan_id]);

        const message: string = "Successfully deleted loan";
        const data = {
          users: {
            id: admin_user[0].id,
            username: admin_user[0].username,
            email: admin_user[0].email,
            role: admin_user[0].role,
          },
          loans: {
            id: loan[0].id,
            user_id: loan[0].user_id,
            microfinance_id: loan[0].microfinance_id,
            amount: loan[0].amount,
            status: loan[0].status,
          },
        };

        return response201Helper(response, message, data);
      } else {
        //else if loan does not exists
        const message: string = "Loan not found or has been deleted";
        const data = {
          loans: {
            id: loan_id,
          },
        };

        return response404Helper(response, message, data);
      }
    } else {
      //if not and admin
      const message: string =
        "Unauthorized. Only admin can perform this action";
      const data = {
        users: {
          id: admin_id,
        },
        loans: {
          id: loan_id,
        },
      };

      return response401Helper(response, message, data);
    }
  } catch (error) {
    return response500Helper(response, error);
  }
}
