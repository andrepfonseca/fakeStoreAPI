import { NextFunction, Request, Response } from "express";
import usersServices from "../services/usersServices";
import { User } from "../types";

const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: User = await usersServices.postUser(req.body);

    res.status(201).send(user);
  } catch (error: any) {
    next(error);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedUser: User = await usersServices.putUser({
      user: req.body,
      userId: parseInt(req.params.id),
    });

    res.status(201).send(updatedUser);
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
    const token: string | undefined = await usersServices.loginUser(req.body);

    res.send(token);
  } catch (error: any) {
    next(error);
  }
};

export default { insert, login, update };
