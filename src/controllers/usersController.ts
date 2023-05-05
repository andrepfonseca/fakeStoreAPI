import { NextFunction, Request, Response } from "express";
import usersServices from "../services/usersServices";

const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await usersServices.insertUser(req.body.user);

    res.status(201).send(user);
  } catch (error: any) {
    next(error);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = await usersServices.loginUser(req.body.user);
    res.send(token);
  } catch (error: any) {
    next(error);
  }
};

export default { insert, login };
