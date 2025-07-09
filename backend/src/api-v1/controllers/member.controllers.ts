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
    sacco_id,
    first_name,
    last_name,
    user_name,
    user_email,
    phone_number,
    password,
  } = request.body;
  const id = uid();
  const user_role = UserRoles.member;
  const user_status = UserStatus.pending;

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
    const [rows] = await connection.query(`CALL getUserById(?)`, [admin_id]);
    const admin_user = rows[0] as Users[]; //runs despite LSP error

    if (admin_user[0].user_role == "admin") {
      // hash the user password
      const salt_rounds = 9;
      const hashed_password = await bcrypt.hash(password, salt_rounds);

      // add user to system
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
      // release pool connection
      connection.release();

      return response.status(201).json({
        code: 201,
        status: "success",
        message: "Member succesfully created",
        data: {
          id,
          user_name,
          user_email,
          user_role,
        },
        metadata: {},
      });
    } else {
      // if not an admin
      return response.status(401).json({
        code: 401,
        status: "error",
        message: "Unauthorized. Only admins can create members",
        data: {
          id: admin_user[0].id,
          username: admin_user[0].user_name,
          email: admin_user[0].user_email,
          role: admin_user[0].user_role,
        },
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

export async function getMembers(request: Request, response: Response) {
  /*
   * returns list of all registered memeber in system.
   * only performed by admin. else error
   */
}

export async function activateMember(reuest: Request, response: Response) {
  /*
   * used by admin to activate member accounts. if not admin, error
   */
}

export async function deleteMember(request: Request, response: Response) {
  /*
   * used by admin to delete a members acc.
   * cannot delete anotheer admins acc. must be admin to perform this
   */
}
