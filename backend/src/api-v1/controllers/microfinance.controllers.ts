import { Request, Response } from "express";
import { v4 as uid } from "uuid";

import { pool } from "../../config/db.config";
import {
  Microfinances,
  MicrofinanceStatus,
} from "../models/microfinance.models";
import {
  registerMicroFinanceSchema,
  updateMicrofinanceSchema,
} from "../validators/microfinance.validators";
import { UserRoles, Users } from "../models/users.models";

export async function createMicrofinance(request: Request, response: Response) {
  /*
   * used by admin to create new microfinances(SACCOS)
   */
  const id = uid();
  const status = MicrofinanceStatus.active;
  const { reg_number, name, email, phone_number, location } = request.body;
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
        metadata: null,
      });
    }
    //if no validation error
    const connection = await pool.getConnection();
    await connection.execute(`CALL addMicrofinance(?,?,?,?,?,?,?);`, [
      id,
      reg_number,
      name,
      email,
      phone_number,
      location,
      status,
    ]);
    connection.release();

    return response.status(201).json({
      code: 201,
      status: "success",
      message: "Microfinance created successfully",
      data: {
        microfinances: {
          id,
          reg_number,
          name,
          email,
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

export async function getMicrofinances(request: Request, response: Response) {
  /*
   * used be admin to return list of all microfinances(SACCOS)
   * TODO: also good for pagination
   */
  try {
    const connection = await pool.getConnection();
    const [rows]: any = await connection.execute(`CALL getAllMicrofinances();`);
    const microfinances = rows[0] as Microfinances[]; //runs despite LSP
    connection.release();

    if (microfinances.length > 0) {
      return response.status(200).json({
        code: 200,
        status: "success",
        message: "Microfinances successfully retrieved",
        data: { microfinances },
        metadata: {},
      });
    }
    // else if no microfinances in db currenly in system
    return response.status(404).json({
      code: 404,
      status: "error",
      message: "Microfinances not found. Try again later?",
      data: null,
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

export async function updateMicrofinance(
  request: Request<{ id: string }>,
  response: Response,
) {
  /*update microfinance details.
   * can only be performed by an admin user
   */

  const admin_id = request.params.id;
  const { microfinance_id, reg_number, name, email, phone_number, location } =
    request.body;

  try {
    // validate request.body
    const { error } = updateMicrofinanceSchema.validate(request.body);
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
    const admin_user = rows[0] as Users[];

    if (admin_user.length > 0 && admin_user[0].role == UserRoles.admin) {
      const [rows]: any = await connection.execute(
        `CALL getMicrofinanceById(?);`,
        [microfinance_id],
      );
      const microfinance_to_be_updated = rows[0] as Microfinances[];

      //if microfinance exists and is active
      if (
        microfinance_to_be_updated.length > 0 &&
        microfinance_to_be_updated[0].status == MicrofinanceStatus.active
      ) {
        await connection.execute(`CALL updateMicrofinance(?,?,?,?,?,?);`, [
          microfinance_id,
          reg_number || microfinance_to_be_updated[0].reg_number,
          name || microfinance_to_be_updated[0].name,
          email || microfinance_to_be_updated[0].email,
          phone_number || microfinance_to_be_updated[0].phone_number,
          location || microfinance_to_be_updated[0].location,
        ]);

        return response.status(201).json({
          code: 201,
          status: "success",
          message: "Successfully updated microfinance",
          data: {
            users: {
              id: admin_user[0].id,
              username: admin_user[0].username,
              email: admin_user[0].email,
              microfinance_id: admin_user[0].microfinance_id,
            },
            microfinances: {
              id: microfinance_id,
              name,
              reg_number,
              email,
            },
          },
          metadata: null,
        });
        //else if microfinance does not exist
      } else {
        return response.status(404).json({
          code: 404,
          status: "error",
          message: "Not found. Microfinance does not exist or is not active",
          data: {
            microfinances: {
              id: microfinance_id,
            },
          },
          metadata: null,
        });
      }

      //else if not an admin
    } else {
      return response.status(401).json({
        code: 401,
        status: "error",
        message: "Unauthorized. Only admin can perform this action",
        data: {
          users: {
            id: admin_id,
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
      data: { error },
      metadata: null,
    });
  }
}

export async function deleteMicrofinance(
  request: Request<{ id: string }>,
  response: Response,
) {
  /*
   * delete microfinances from the system
   * can only be performed by the admin
   */
  const admin_id = request.params.id;
  const { microfinance_id } = request.body;

  try {
    const connection = await pool.getConnection();
    const [rows]: any = await connection.execute(`CALL getUserById(?);`, [
      admin_id,
    ]);
    const admin_user = rows[0] as Users[];

    if (admin_user.length > 0 && admin_user[0].role == UserRoles.admin) {
      const [rows]: any = await connection.execute(
        `CALL getMicrofinanceById(?);`,
        [microfinance_id],
      );
      const microfinance = rows[0] as Microfinances[];

      //if microfinance exists deleted
      console.log(microfinance.length);
      if (microfinance.length > 0) {
        await connection.execute(`CALL deleteMicrofinance(?);`, [
          microfinance_id,
        ]);

        return response.status(201).json({
          code: 201,
          status: "success",
          message: "Successfully deleted microfinance",
          data: {
            users: {
              id: admin_user[0].id,
              username: admin_user[0].username,
              email: admin_user[0].email,
              role: admin_user[0].role,
            },
            microfinances: {
              id: microfinance[0].id,
              name: microfinance[0].name,
              reg_number: microfinance[0].reg_number,
            },
          },
        });
        // else if microfinance does not exist
      } else {
        return response.status(400).json({
          code: 400,
          status: "error",
          message: "Microfinance not found or has already been deleted",
          data: {
            microfinances: {
              id: microfinance_id,
            },
          },
          metadata: null,
        });
      }

      //if not an admin user
    } else {
      return response.status(401).json({
        code: 401,
        status: "error",
        message: "Unauthorized. Only admin can perform this action",
        data: {
          users: {
            id: admin_id,
          },
          microfinances: {
            id: microfinance_id,
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
      data: { error },
      metadata: null,
    });
  }
}
