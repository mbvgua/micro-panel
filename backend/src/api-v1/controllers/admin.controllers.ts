import { Request, Response } from "express";
import { v4 as uid } from "uuid";
import bcrypt from "bcrypt";

import { pool } from "../../config/db.config";
import { UserRoles, Users, UserStatus } from "../models/users.models";
import { sqlError } from "../models/db.models";
import { adminRegSchema } from "../validators/admin.validators";

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

    const saltRounds = 9;
    const hashed_password = await bcrypt.hash(password, saltRounds);

    const connection = await pool.getConnection();
    await connection.query(
      `INSERT INTO users(id,sacco_id,first_name,last_name,user_name,user_email,phone_number,hashed_password,user_role,user_status) 
    VALUES(
        "${id}",
        "${sacco_id}",
        "${first_name}",
        "${last_name}",
        "${user_name}",
        "${user_email}",
        "${phone_number}",
        "${hashed_password}",
        "${user_role}",
        "${user_status}");`,
    );
    // release connection
    connection.release();

    return response.status(201).json({
      code: 201,
      status: "success",
      message: "User registration success",
      data: {
        id: id,
        user_name: user_name,
        user_email: user_email,
        user_role: user_role,
      },
      metadata: {},
    });
  } catch (error: sqlError | any) {
    return response.status(500).json({
      code: 500,
      status: "error",
      message: "Server error",
      data: error,
      metadata: {},
    });
  }
}

