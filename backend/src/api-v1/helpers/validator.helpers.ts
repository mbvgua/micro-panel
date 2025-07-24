import { Request, Response } from "express";

export async function validationHelper(
  request: Request,
  response: Response,
  schema: any,
) {
  /*
   * validation helper to eliminate need to repetitively define it in each
   * function. Implements DRY code!
   */

  const { error } = schema.validate(request.body);
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
  } else {
    //if no validation errror
    return true;
  }
}
