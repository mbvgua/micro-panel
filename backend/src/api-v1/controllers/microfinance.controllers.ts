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
import { validationHelper } from "../helpers/validator.helpers";
import {
  response200Helper,
  response201Helper,
  response401Helper,
  response404Helper,
  response500Helper,
} from "../helpers/response.helpers";

export async function createMicrofinance(request: Request, response: Response) {
  /*
   * used by admin to create new microfinances(SACCOS)
   */
  const id = uid();
  const status = MicrofinanceStatus.active;
  const { reg_number, name, email, phone_number, location } = request.body;
  try {
    // validate request.body
    validationHelper(request, response, registerMicroFinanceSchema);

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

    const message: string = "Microfinance created successfully";
    const data = {
      microfinances: {
        id,
        reg_number,
        name,
        email,
        status,
      },
    };

    return response201Helper(response, message, data);
  } catch (error) {
    return response500Helper(response, error);
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
      const message: string = "Microfinances successfully retrieved";
      const data = { microfinances };
      return response200Helper(response, message, data);
    }
    // else if no microfinances in db currenly in system
    const message: string = "Microfinances not found";
    const data = null;

    return response404Helper(response, message, data);
  } catch (error) {
    return response500Helper(response, error);
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
    validationHelper(request, response, updateMicrofinanceSchema);

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

        const message: string = "Successfully updated microfinance";
        const data = {
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
        };

        return response201Helper(response, message, data);
      } else {
        //else if microfinance does not exist
        const message: string =
          "Not found. Microfinance does not exist or is not active";
        const data = {
          microfinances: {
            id: microfinance_id,
          },
        };

        return response404Helper(response, message, data);
      }
    } else {
      //else if not an admin
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
      if (microfinance.length > 0) {
        await connection.execute(`CALL deleteMicrofinance(?);`, [
          microfinance_id,
        ]);

        const message: string = "Successfully deleted microfinance";
        const data = {
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
        };

        return response201Helper(response, message, data);
      } else {
        // else if microfinance does not exist
        const message: string =
          "Microfinance not found or has already been deleted";
        const data = {
          microfinances: {
            id: microfinance_id,
          },
        };

        return response404Helper(response, message, data);
      }
    } else {
      //if not an admin user
      const message: string =
        "Unauthorized. Only admin can perform this action";
      const data = {
        users: {
          id: admin_id,
        },
        microfinances: {
          id: microfinance_id,
        },
      };

      return response401Helper(response, message, data);
    }
  } catch (error) {
    return response500Helper(response, error);
  }
}
