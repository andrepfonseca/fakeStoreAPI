import { Request, Response } from "express";
import { ErrorType } from "../types";

export const errorHandler = (
  error: ErrorType,
  _req: Request,
  res: Response
) => {
  const status: number = error.status ? error.status : 500;

  const errorResponse: ErrorType = {
    message: error.message ? error.message : "Internal server error",
    stack: error.stack,
    status,
  };

  res.status(status).json(errorResponse);
};

export const makeError = ({ message, status }: ErrorType) => {
  return { message, status };
};
