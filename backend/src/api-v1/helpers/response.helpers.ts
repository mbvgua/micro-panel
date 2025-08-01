import { Response } from "express";

/*
 * chose to make the responses hard coded since the message and data
 * needs to also be dynamic. dont have standardized responses yet.
 * which might prove chaotic atm
 * also, declaring const individualy in each endpoint might prove
 * to more verbose then how it initially was
 */

export function response200Helper(
  response: Response,
  message: string,
  data: any,
) {
  /*
   * Success. No new resource created
   */

  response.status(200).json({
    code: 200,
    status: "success",
    message: message,
    data: data,
    metadata: null,
  });
}

export function response201Helper(
  response: Response,
  message: string,
  data: any,
) {
  /*
   * Success.New resource created.
   */

  response.status(201).json({
    code: 201,
    status: "success",
    message: message,
    data: data,
    metadata: null,
  });
}

export function response401Helper(
  response: Response,
  message: string,
  data: any,
) {
  /*
   * Unauthorized error
   */

  response.status(401).json({
    code: 401,
    status: "error",
    message: message,
    data: data,
    metadata: null,
  });
}

export function response403Helper(
  response: Response,
  message: string,
  data: any,
) {
  /*
   * Forbidden errors
   */

  response.status(403).json({
    code: 403,
    status: "error",
    message: message,
    data: data,
    metadata: null,
  });
}

export function response404Helper(
  response: Response,
  message: string,
  data: any,
) {
  /*
   * Resource not found error
   */

  response.status(404).json({
    code: 404,
    status: "error",
    message: message,
    data: data,
    metadata: null,
  });
}

export function response422Helper(
  response: Response,
  message: string,
  data: any,
) {
  /*
   * Not authorized errors
   */

  response.status(422).json({
    code: 422,
    status: "error",
    message: message,
    data: data,
    metadata: null,
  });
}

export function response500Helper(response: Response, error: any) {
  /*
   * Internal Server errors
   */

  response.status(500).json({
    code: 500,
    status: "error",
    message: "Internal server error",
    data: error,
    metadata: null,
  });
}
