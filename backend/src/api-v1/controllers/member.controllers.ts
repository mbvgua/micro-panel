import { Request, Response } from "express";
import { v4 as uid } from "uuid";
import bcrypt from "bcrypt";

import { pool } from "../../config/db.config";
import { Users, UserStatus, UserRoles } from "../models/users.models";
import {
  memberRegSchema,
  updateMemberSchema,
} from "../validators/member.validators";
import { validationHelper } from "../helpers/validator.helpers";
import {
  response200Helper,
  response201Helper,
  response401Helper,
  response404Helper,
  response500Helper,
} from "../helpers/response.helpers";

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
    validationHelper(request, response, memberRegSchema);

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

      //send response
      const message: string = "Member succesfully created";
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
    } else {
      // if not an admin
      const message: string = "Unauthorized. Only admins can create members";
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
    }
  } catch (error) {
    return response500Helper(response, error);
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
      const message: string = "Succesfully retrieved all users from database";
      const data = { users };
      return response200Helper(response, message, data);
    }
    // if no members in system
    const message: string = "No users found";
    const data = null;
    return response404Helper(response, message, data);
  } catch (error) {
    return response500Helper(response, error);
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

        //send response
        const message: string = "Succesfully activate user account";
        const data = {
          users: {
            id: user_to_activate[0].id,
            microfinance_id: user_to_activate[0].microfinance_id,
            username: user_to_activate[0].username,
            email: user_to_activate[0].email,
            role: user_to_activate[0].role,
            status: user_to_activate[0].status,
          },
        };

        return response200Helper(response, message, data);
      } else {
        // if user does not exists
        const message: string =
          "User not found or account is already activated.";
        const data = {
          users: {
            id: user_id,
          },
        };

        return response404Helper(response, message, data);
      }
    } else {
      // else if not an admin
      const message: string =
        "Unauthorized. Only admins can perform this action";
      const data = {
        id: admin_user[0].id,
        microfinance_id: admin_user[0].microfinance_id,
        username: admin_user[0].username,
        email: admin_user[0].email,
        role: admin_user[0].role,
        status: admin_user[0].status,
      };

      return response401Helper(response, message, data);
    }
  } catch (error) {
    return response500Helper(response, error);
  }
}

export async function updateMember(
  request: Request<{ id: string }>,
  response: Response,
) {
  /*
   * user updates their own profile. admin can update anyones profile
   * user status must be "active" to be updated
   */

  const user_making_request_id = request.params.id;
  const {
    user_id,
    microfinance_id,
    firstname,
    lastname,
    username,
    email,
    phone_number,
    password,
  } = request.body;

  try {
    // validate user input
    validationHelper(request, response, updateMemberSchema);

    // if no validation errors
    const connection = await pool.getConnection();
    const [rows]: any = await connection.execute(`CALL getUserById(?);`, [
      user_making_request_id,
    ]);
    const user_making_request = rows[0] as Users[];

    const [results]: any = await connection.execute(`CALL getUserById(?);`, [
      user_id,
    ]);
    const user_to_be_updated = results[0] as Users[];

    //if its an admin or the actual user
    if (
      user_making_request[0].role == UserRoles.admin ||
      user_making_request_id == user_id
    ) {
      //hash the new passwrod
      //The password MUST be passed in request
      const salt_rounds = 9;
      const hashed_password = await bcrypt.hash(password, salt_rounds);

      // The OR option is used if the value is not passed into the request
      // Thus it will not be updated as null
      const [rows]: any = await connection.execute(
        `CALL updateUser(?,?,?,?,?,?,?,?);`,
        [
          user_id,
          microfinance_id || user_to_be_updated[0].microfinance_id,
          firstname || user_to_be_updated[0].firstname,
          lastname || user_to_be_updated[0].lastname,
          username || user_to_be_updated[0].username,
          email || user_to_be_updated[0].email,
          phone_number || user_to_be_updated[0].phone_number,
          hashed_password || user_to_be_updated[0].hashed_password,
        ],
      );

      const message: string = "Memeber succesfully updated";
      const data = {
        users: {
          microfinance_id,
          username,
          email,
        },
      };

      return response201Helper(response, message, data);
    } else {
      //else if not an admin or actual user
      const message: string =
        "Unauthorized. Only admins or the user themselves can perform this action";
      const data = {
        users: {
          username: user_making_request[0].username,
          email: user_making_request[0].email,
          role: user_making_request[0].role,
        },
      };

      return response401Helper(response, message, data);
    }
  } catch (error) {
    return response500Helper(response, error);
  }
}

export async function deleteMember(
  request: Request<{ id: string }>,
  response: Response,
) {
  /*
   * delete user from db
   * can only be performed by and admin
   */

  const admin_id = request.params.id;
  const { user_id } = request.body;

  try {
    const connection = await pool.getConnection();
    const [rows]: any = await connection.execute(`CALL getUserById(?);`, [
      admin_id,
    ]);
    const admin_user = rows[0] as Users[];

    //ensure only admins can perform this action
    if (admin_user[0].role == UserRoles.admin) {
      const [results]: any = await connection.execute(`CALL getUserById(?);`, [
        user_id,
      ]);
      const user_to_be_deleted = results[0] as Users[];

      //ensure user exists in db
      if (user_to_be_deleted.length > 0) {
        await connection.execute(`CALL deleteUser(?);`, [user_id]);

        const message: string = "Succesfully deleted user";
        const data = {
          users: {
            id: user_to_be_deleted[0].id,
            username: user_to_be_deleted[0].username,
            email: user_to_be_deleted[0].email,
            microfinance_id: user_to_be_deleted[0].microfinance_id,
          },
        };

        return response201Helper(response, message, data);
      } else {
        //if user is not in db
        const message: string =
          "User not found or has already already been deleted";
        const data = {
          users: {
            id: user_id,
          },
        };

        return response404Helper(response, message, data);
      }
    } else {
      //error if action not performed by and admin
      const message: string =
        "Unauthorized. Only admins can perform this action";
      const data = {
        users: {
          username: admin_user[0].username,
          email: admin_user[0].email,
          role: admin_user[0].role,
        },
      };
      return response401Helper(response, message, data);
    }
  } catch (error) {
    return response500Helper(response, error);
  }
}
