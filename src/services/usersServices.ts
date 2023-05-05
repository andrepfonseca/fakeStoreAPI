import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usersRepositories from "../repositories/usersRepositories";
import { User } from "../types";

const insertUser = async (user: User): Promise<User> => {
  const { ...userForDB } = user;
  const hashedPassword = await bcrypt.hash(user.password, 10);
  userForDB.password = hashedPassword;

  const userId = await usersRepositories.putUser(userForDB);
  if (userId.length === 0) throw new Error("Error creating user");

  userForDB.id = userId[0];
  return userForDB;
};

const loginUser = async (user: User): Promise<string | undefined> => {
  const { ...userToLogin } = user;
  const userFromDB = await usersRepositories.selectUserByEmail(userToLogin);
  if (userFromDB.length === 0) {
    throw new Error("User not found");
  }
  let token;
  if (await bcrypt.compare(userToLogin.password, userFromDB[0].password)) {
    token = jwt.sign(
      {
        user: {
          id: userFromDB[0].id,
          name: userFromDB[0].name,
          email: userFromDB[0].email,
          password: userFromDB[0].password,
        },
      },
      process.env.SECRET_TOKEN!,
      { expiresIn: "7 days" }
    );
  }
  if (token) {
    return token;
  } else {
    throw new Error("Could not generate token");
  }
};

export default {
  insertUser,
  loginUser,
};
