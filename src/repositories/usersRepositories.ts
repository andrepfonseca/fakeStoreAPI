import knex from "knex";
import { Knex } from "knex";
import config from "../../knexfile";
import { User } from "../types";

const knexInstance: Knex = knex(config);

const selectUserByEmail = (user: User): Promise<User[]> =>
  knexInstance("users").select("*").where({ "users.email": user.email });

const insertUser = (user: User): Promise<number[]> =>
  knexInstance("users").insert(user);

const updateUser = (user: User): Promise<number> =>
  knexInstance("users").update(user).where({ id: user.id });

export default {
  insertUser,
  selectUserByEmail,
  updateUser,
};
