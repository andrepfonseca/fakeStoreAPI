import bcrypt from "bcrypt";
import usersRepositories from "../repositories/usersRepositories";
import hash from "../utils/hash";
import tokenGenerator from "../utils/token";
import { User } from "../types";

const postUser = async (user: User): Promise<User> => {
  const { ...userForDB }: User = user;

  const hashedPassword: string = await hash.hash(userForDB.password);
  userForDB.password = hashedPassword;

  const userId: number[] = await usersRepositories.insertUser(userForDB);
  if (userId.length === 0) throw new Error("Error creating user");

  userForDB.id = userId[0];
  return userForDB;
};

const putUser = async ({
  user,
  userId,
}: {
  user: User;
  userId: number;
}): Promise<User> => {
  const { ...userToUpdate }: User = user;
  userToUpdate.id = userId;

  const updatedUser: number = await usersRepositories.updateUser(userToUpdate);
  if (!updatedUser)
    throw new Error("Failed to update user or user does not exist");

  const userToReturn: any = { ...userToUpdate };
  delete userToReturn.password;

  return userToReturn;
};

const loginUser = async (user: User): Promise<string | undefined> => {
  const { ...userToLogin }: User = user;

  const userFromDB: User[] = await usersRepositories.selectUserByEmail(
    userToLogin
  );
  if (userFromDB.length === 0) {
    throw new Error("User not found");
  }

  let token;
  if (await bcrypt.compare(userToLogin.password, userFromDB[0].password)) {
    token = tokenGenerator.generateToken(userFromDB[0]);
  }

  if (token) {
    return token;
  } else {
    throw new Error("Could not generate token");
  }
};

export default {
  postUser,
  putUser,
  loginUser,
};
