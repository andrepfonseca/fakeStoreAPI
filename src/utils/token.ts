import jwt from "jsonwebtoken";
import { User } from "../types";

const generateToken = (user: User): string =>
  jwt.sign(
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    process.env.SECRET_TOKEN!,
    { expiresIn: "7 days" }
  );

export default {
  generateToken,
};
