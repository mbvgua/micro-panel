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
import {
  response200Helper,
  response201Helper,
  response404Helper,
  response422Helper,
  response500Helper,
} from "../helpers/response.helpers";

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

    //send response
    const message: string = "Admin successfully registered";
    const data = {
      users: {
        id,
        microfinance_id,
        username,
        email,
        role,
        status,
      },
    };
    return response201Helper(response, message, data);
  } catch (error) {
    return response500Helper(response, error);
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
          const message: string = "Successful admin login";
          const data = {
            users: {
              id: users[0].id,
              microfinance_id: users[0].microfinance_id,
              email: username_or_email,
              role: users[0].role,
              status: users[0].status,
            },
          };
          return response200Helper(response, message, data);
        }
        // else passwords do not match
        const message: string = "Invalid password. Try again?";
        const data = {
          email: username_or_email,
          password: password,
        };
        return response422Helper(response, message, data);
      } else {
        // no user match found
        const message: string = "User not found";
        const data = {
          email: username_or_email,
          password: password,
        };

        return response404Helper(response, message, data);
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
          const message: string = "Successful admin login";
          const data = {
            users: {
              id: users[0].id,
              microfinance_id: users[0].microfinance_id,
              username: username_or_email,
              role: users[0].role,
              status: users[0].status,
            },
          };
          return response200Helper(response, message, data);
        }
        // else passwords do not match
        const message: string = "Invalid password. Try again?";
        const data = {
          email: username_or_email,
          password: password,
        };
        return response422Helper(response, message, data);
      } else {
        // no user match found
        const message: string = "User not found";
        const data = {
          username: username_or_email,
          password: password,
        };
        return response404Helper(response, message, data);
      }
    }
  } catch (error) {
    return response500Helper(response, error);
  }
}
