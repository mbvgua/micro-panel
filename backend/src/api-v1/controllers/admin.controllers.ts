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

export async function adminRegistration(request: Request, response: Response) {
  /**
   *  Registers admins into the system
   *  Has 3 gotchas:
   *   -> sacco_id: 0000
   *   -> user_role: "admin"
   *   -> status: "active"
   */
  const {
    first_name,
    last_name,
    user_name,
    user_email,
    phone_number,
    password,
  } = request.body;
  const id = uid();
  const sacco_id = "0000";
  const user_role = UserRoles.admin;
  const user_status = UserStatus.active;

  try {
    const { error } = adminRegSchema.validate(request.body);
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

    const salt_rounds = 9;
    const hashed_password = await bcrypt.hash(password, salt_rounds);

    const connection = await pool.getConnection();
    await connection.query(`CALL addUser(?,?,?,?,?,?,?,?,?,?)`, [
      id,
      sacco_id,
      first_name,
      last_name,
      user_name,
      user_email,
      phone_number,
      hashed_password,
      user_role,
      user_status,
    ]);
    // release connection
    connection.release();

    return response.status(201).json({
      code: 201,
      status: "success",
      message: "Admin successfully registered",
      data: {
        id,
        user_name,
        user_email,
        user_role,
      },
      metadata: {},
    });
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

export async function adminLogin(request: Request, response: Response) {
  /*
   * Login existing admins into the system
   * went with userNameOrEmail not user_name_or_email as the latter takes
   * up too much space
   */

  const { userNameOrEmail, password } = request.body;
  const email_regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

  try {
    // if using email
    if (email_regex.test(userNameOrEmail)) {
      const { error } = emailLoginSchema.validate(request.body);
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

      // if no error in email validation
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`CALL getUserByNameOrEmail(?)`, [
        userNameOrEmail,
      ]);
      const users = rows[0] as Users[]; //runs despite error from LSP
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
              username: userNameOrEmail,
            },
            metadata: {},
          });
        }
        // else passwords do not match
        return response.status(422).json({
          code: 422,
          status: "error",
          message: "Invalid password. Try again?",
          data: {
            email: userNameOrEmail,
            password: password,
          },
          metadata: {},
        });
      } else {
        // no user match found
        return response.status(404).json({
          code: 404,
          status: "error",
          message: "User not found",
          data: {
            email: userNameOrEmail,
            password: password,
          },
          metadata: {},
        });
      }
    } else {
      // else if not using email
      const { error } = usernameLoginSchema.validate(request.body);
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

      // if no error in username validation
      const connection = await pool.getConnection();
      const [rows] = await connection.query(`CALL getUserByNameOrEmail(?)`, [
        userNameOrEmail,
      ]);
      const users = rows[0] as Users[]; //runs despite error from LSP
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
              username: userNameOrEmail,
            },
            metadata: {},
          });
        }
        // else passwords do not match
        return response.status(422).json({
          code: 422,
          status: "error",
          message: "Invalid password. Try again?",
          data: {
            username: userNameOrEmail,
            password: password,
          },
          metadata: {},
        });
      } else {
        // no user match found
        return response.status(404).json({
          code: 404,
          status: "error",
          message: "User not found",
          data: {
            username: userNameOrEmail,
            password: password,
          },
          metadata: {},
        });
      }
    }
  } catch (error ) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Server error",
      data: error,
      metadata: {},
    });
  }
}
