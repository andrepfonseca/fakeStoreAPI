import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = error.status ? error.status : 500;

  const errorResponse: {
    message: string;
    stack: string;
  } = {
    message: error.message ? error.message : "Internal server error",
    stack: error.stack,
  };

  res.status(status).json(errorResponse);
};
