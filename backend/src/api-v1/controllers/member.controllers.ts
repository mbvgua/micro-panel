import { Request, Response } from "express";
import { v4 as uid } from "uuid";
import bcrypt from "bcrypt";

import { pool } from "../../config/db.config";
import { Users, UserStatus, UserRoles } from "../models/users.models";
import { memberRegSchema } from "../validators/member.validators";

export async function createMember(request: Request, response: Response) {
  /*
   * creates new members in system
   * can only be created by the admin. else unauthorized to do that
   */
  const {
    admin_id,
    microfinance_id,
    firstname,
    lastname,
    username,
    email,
    phone_number,
    password,
  } = request.body;
  const id = uid();
  const role = UserRoles.member;
  const status = UserStatus.pending;

  try {
    // validate user input
    const { error } = memberRegSchema.validate(request.body);
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

    // if no validation errors
    const connection = await pool.getConnection();
    const [rows]: any = await connection.query(`CALL getUserById(?)`, [
      admin_id,
    ]);
    const admin_user = rows[0] as Users[];

    if (admin_user[0].role == "admin") {
      // hash the user password
      const salt_rounds = 9;
      const hashed_password = await bcrypt.hash(password, salt_rounds);

      // add user to system
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
      // release pool connection
      connection.release();

      return response.status(201).json({
        code: 201,
        status: "success",
        message: "Member succesfully created",
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
    } else {
      // if not an admin
      return response.status(401).json({
        code: 401,
        status: "error",
        message: "Unauthorized. Only admins can create members",
        data: {
          users: {
            id: admin_user[0].id,
            microfinance_id: admin_user[0].microfinance_id,
            username: admin_user[0].username,
            email: admin_user[0].email,
            role: admin_user[0].role,
            status: admin_user[0].status,
          },
        },
        metadata: null,
      });
    }
  } catch (error) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Server error",
      data: {error},
      metadata: null,
    });
  }
}

export async function getMembers(request: Request, response: Response) {
  /*
   * returns list of all registered memeber in system.
   * only performed by admin. else error
   * TODO: add pagination to user retrieval
   * TODO: maybe add id parameters to ensure it is and admin calling this
   */
  try {
    const connection = await pool.getConnection();
    const [rows]: any = await connection.execute(`CALL getAllUsers();`);
    const users = rows[0] as Users[];
    connection.release();

    if (users.length > 0) {
      return response.status(200).json({
        code: 200,
        status: "success",
        message: "Succesfully retrieved all users from database",
        data: { users },
        metadata: null,
      });
    }
    // if no members in system
    return response.status(404).json({
      code: 404,
      status: "error",
      message: "No users found",
      data: null,
      metadata: null,
    });
  } catch (error) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Server error",
      data: {error},
      metadata: null,
    });
  }
}

export async function activateMember(
  request: Request<{ id: string }>,
  response: Response,
) {
  /*
   * used by admin to activate member accounts. if not admin, error
   */
  const admin_id = request.params.id;
  const { user_id } = request.body;
  try {
    const connection = await pool.getConnection();
    const [rows]: any = await connection.execute(`CALL getUserById(?);`, [
      admin_id,
    ]);
    const admin_user = rows[0] as Users[];
    connection.release();

    if (admin_user[0].role == "admin") {
      const [results]: any = await connection.execute(
        `CALL getInactiveUsersById(?);`,
        [user_id],
      );
      const user_to_activate = results[0] as Users[];
      connection.release();

      // if user_to_activate exists
      if (user_to_activate.length > 0) {
        await connection.execute(`CALL activateUserById(?);`, [user_id]);
        connection.release();

        return response.status(200).json({
          code: 200,
          status: "success",
          message: "Succesfully activated user account",
          data: {
            users: {
              id: user_to_activate[0].id,
              microfinance_id: user_to_activate[0].microfinance_id,
              username: user_to_activate[0].username,
              email: user_to_activate[0].email,
              role: user_to_activate[0].role,
              status: user_to_activate[0].status,
            },
          },
          metadata: null,
        });
      } else {
        // if user does not exists
        return response.status(404).json({
          code: 404,
          status: "error",
          message: "User not found or account is already activated.",
          data: {
            users: {
              id: user_id,
            },
          },
          metadata: {},
        });
      }
    } else {
      // else if not an admin
      return response.status(401).json({
        code: 401,
        status: "error",
        message: "Unauthorized. Only admins can perform this action",
        data: {
          id: admin_user[0].id,
          microfinance_id: admin_user[0].microfinance_id,
          username: admin_user[0].username,
          email: admin_user[0].email,
          role: admin_user[0].role,
          status: admin_user[0].status,
        },
        metadata: null,
      });
    }
  } catch (error) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Server error",
      data: {error},
      metadata: null,
    });
  }
}
