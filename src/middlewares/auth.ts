import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ error: "No token provided" });
    }

    const [scheme, token] = authHeader.split(" ");

    const isTokenValid = jwt.verify(token, process.env.SECRET_TOKEN!);
    if (!isTokenValid) throw new Error("Invalid token");

    const decoded: { user: { id: number } } = jwt_decode(token);

    next();
  } catch (error) {
    next(error);
  }
};

export default {
  authToken,
};
