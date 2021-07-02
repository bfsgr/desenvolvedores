import { NextFunction, Request, Response } from "express";
import { ValidatorErrorResponse } from "../helpers/ValidatorErrorResponse";
import { ErrorNotFound } from "../helpers/ErrorNotFound";
import { StatusCodes } from "http-status-codes";

export function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (err instanceof ValidatorErrorResponse) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      error: err.details,
    });
  }

  if (err instanceof ErrorNotFound) {
    return response.status(StatusCodes.NOT_FOUND).json({
      error: err.message,
    });
  }

  if (err instanceof Error) {
    return response.status(StatusCodes.BAD_REQUEST).json({
      error: err.message,
    });
  }

  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal Server Error",
  });
}
