import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";

const knexInstance: Knex = knex(config);

const selectAllCategoriesNames = () =>
  knexInstance("categories").select("name");

const selectCategoryById = (
  id: number
): Promise<{ id: number; category: string }[]> =>
  knexInstance("categories").select("*").where({ "categories.id": id });

const selectCategoryIdByName = (
  name: string | undefined
): Promise<{ id: number }[]> =>
  knexInstance("categories").select("id").where({ name });

const selectCategoryByName = (
  name: string
): Promise<{ id: number; category: string }[]> =>
  knexInstance("categories").select("*").where({ "categories.name": name });

const insertCategory = (name: string): Promise<number[]> =>
  knexInstance("categories").insert({ name });

const updateCategory = (name: string, id: number): Promise<number> =>
  knexInstance("categories").update({ name }).where({ id });

const deleteCategory = (id: number): Promise<number> =>
  knexInstance("categories").delete().where({ id });

export default {
  selectAllCategoriesNames,
  selectCategoryIdByName,
  selectCategoryById,
  selectCategoryByName,
  insertCategory,
  updateCategory,
  deleteCategory,
};
