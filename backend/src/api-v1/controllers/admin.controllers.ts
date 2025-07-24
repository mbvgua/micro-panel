import { Request, Response } from "express";
import { v4 as uid } from "uuid";
import bcrypt from "bcrypt";

import { pool } from "../../config/db.config";
import { UserRoles, Users, UserStatus } from "../models/users.models";
import {
  adminRegSchema,
  emailLoginSchema,
  usernameLoginSchema,
} from "../validators/admin.validators";
import { validationHelper } from "../helpers/validator.helpers";

export async function adminRegistration(request: Request, response: Response) {
  /**
   *  Registers admins into the system
   */
  const { firstname, lastname, username, email, phone_number, password } =
    request.body;
  const id = uid();
  const microfinance_id = "0000";
  const role = UserRoles.admin;
  const status = UserStatus.active;

  try {
    //validate request body
    validationHelper(request, response, adminRegSchema);

    const salt_rounds = 9;
    const hashed_password = await bcrypt.hash(password, salt_rounds);

    const connection = await pool.getConnection();
    await connection.query(`CALL addUser(?,?,?,?,?,?,?,?,?,?)`, [
      id,
      microfinance_id,
      firstname,
      lastname,
      username,
      email,
      phone_number,
      hashed_password,
      role,
      status,
    ]);
    // release connection
    connection.release();

    return response.status(201).json({
      code: 201,
      status: "success",
      message: "Admin successfully registered",
      data: {
        users: {
          id,
          microfinance_id,
          username,
          email,
          role,
          status,
        },
      },
      metadata: null,
    });
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

export async function adminLogin(request: Request, response: Response) {
  /*
   * Login existing admins into the system
   * went with userNameOrEmail not user_name_or_email as the latter takes
   * up too much space
   */

  const { username_or_email, password } = request.body;
  const email_regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  try {
    // if using email
    if (email_regex.test(username_or_email)) {
      validationHelper(request, response, emailLoginSchema);

      // if no error in email validation
      const connection = await pool.getConnection();
      const [rows]: any = await connection.query(
        `CALL getUserByNameOrEmail(?)`,
        [username_or_email],
      );
      const users = rows[0] as Users[];
      connection.release();

      //users exists
      if (users.length > 0) {
        // check to see is passwords match
        const is_match = await bcrypt.compare(
          password,
          users[0].hashed_password,
        );

        if (is_match) {
          return response.status(200).json({
            code: 200,
            status: "success",
            message: "Succesful login",
            data: {
              users: {
                id: users[0].id,
                microfinance_id: users[0].microfinance_id,
                email: username_or_email,
                role: users[0].role,
                status: users[0].status,
              },
            },
            metadata: null,
          });
        }
        // else passwords do not match
        return response.status(422).json({
          code: 422,
          status: "error",
          message: "Invalid password. Try again?",
          data: {
            email: username_or_email,
            password: password,
          },
          metadata: null,
        });
      } else {
        // no user match found
        return response.status(404).json({
          code: 404,
          status: "error",
          message: "User not found",
          data: {
            email: username_or_email,
            password: password,
          },
          metadata: null,
        });
      }
    } else {
      // else if not using email
      validationHelper(request, response, usernameLoginSchema);

      // if no error in username validation
      const connection = await pool.getConnection();
      const [rows]: any = await connection.query(
        `CALL getUserByNameOrEmail(?)`,
        [username_or_email],
      );
      const users = rows[0] as Users[];
      connection.release();

      //users exists
      if (users.length > 0) {
        // check to see is passwords match
        const is_match = await bcrypt.compare(
          password,
          users[0].hashed_password,
        );
        if (is_match) {
          return response.status(200).json({
            code: 200,
            status: "success",
            message: "Succesful login",
            data: {
              users: {
                id: users[0].id,
                microfinance_id: users[0].microfinance_id,
                username: username_or_email,
                role: users[0].role,
                status: users[0].status,
              },
            },
            metadata: null,
          });
        }
        // else passwords do not match
        return response.status(422).json({
          code: 422,
          status: "error",
          message: "Invalid password. Try again?",
          data: {
            username: username_or_email,
            password: password,
          },
          metadata: null,
        });
      } else {
        // no user match found
        return response.status(404).json({
          code: 404,
          status: "error",
          message: "User not found",
          data: {
            username: username_or_email,
            password: password,
          },
          metadata: null,
        });
      }
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
