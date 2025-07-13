import { Request, Response } from "express";
import { v4 as uid } from "uuid";

import { pool } from "../../config/db.config";
import {
  Microfinances,
  MicrofinanceStatus,
} from "../models/microfinance.models";
import { registerMicroFinanceSchema } from "../validators/microfinance.validators";

export async function createMicrofinance(request: Request, response: Response) {
  /*
   * used by admin to create new microfinances(SACCOS)
   */
  const id = uid();
  const sacco_status = MicrofinanceStatus.active;
  const {
    registration_number,
    sacco_name,
    sacco_email,
    sacco_phone_number,
    location,
  } = request.body;
  try {
    // validate request.body
    const { error } = registerMicroFinanceSchema.validate(request.body);
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
    await connection.execute(`CALL createMicrofinance(?,?,?,?,?,?,?);`, [
      id,
      registration_number,
      sacco_name,
      sacco_email,
      sacco_phone_number,
      location,
      sacco_status,
    ]);
    connection.release();

    return response.status(201).json({
      code: 201,
      status: "success",
      message: "Microfinance created successfully",
      data: {
        microfinance_id: id,
        microfinance_name: sacco_name,
        microfinance_email: sacco_email,
        microfinance_status: sacco_status,
      },
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

export async function getMicrofinances(request: Request, response: Response) {
  /*
   * used be admin to return list of all microfinances(SACCOS)
   * TODO: also good for pagination
   */
  try {
    const connection = await pool.getConnection();
    const [rows]:any = await connection.execute(`CALL getAllMicrofinances();`);
    const microfinances = rows[0] as Microfinances[]; //runs despite LSP
    connection.release();

    if (microfinances.length > 0) {
      return response.status(200).json({
        code: 200,
        status: "success",
        message: "Microfinances successfully retrieved",
        data: microfinances,
        metadata: {},
      });
    }
    // else if no microfinances in db currenly in system
    return response.status(404).json({
      code: 404,
      status: "error",
      message: "Microfinances not found. Try again later?",
      data: {},
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
