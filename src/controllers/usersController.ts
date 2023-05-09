import { NextFunction, Request, Response } from "express";
import usersServices from "../services/usersServices";
import { User } from "../types";

const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { ...userToInsert }: User = req.body;

    const user: User = await usersServices.postUser(userToInsert);

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
    const userToUpdate: { user: User; userId: number } = {
      user: req.body,
      userId: parseInt(req.params.id),
    };

    const updatedUser: User = await usersServices.putUser(userToUpdate);

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
    const { ...userToLogin }: User = req.body;

    const token: { token: string } = await usersServices.loginUser(userToLogin);

    res.send(token);
  } catch (error: any) {
    next(error);
  }
};

export default { insert, login, update };
