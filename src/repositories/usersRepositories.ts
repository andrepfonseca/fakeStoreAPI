import knex from "knex";
import { Knex } from "knex";
import config from "../../knexfile";
import { User } from "../types";

const knexInstance: Knex = knex(config);

const selectUserByEmail = (user: User) =>
  knexInstance("users").select("*").where({ "users.email": user.email });

const putUser = (user: User) => knexInstance("users").insert(user);

export default {
  putUser,
  selectUserByEmail,
};
