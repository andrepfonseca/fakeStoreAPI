import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";
import { Product } from "../types";

const knexInstance: Knex = knex(config);

const selectAllProducts = async () =>
  await knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "categories.name as category",
      "products.image",
      "products.rate",
      "products.count"
    )
    .join("categories", "categories.id", "=", "products.category_id");

const selectProductById = async (id: number) =>
  await knexInstance("products")
    .select(
      "products.id",
      "products.title",
      "products.price",
      "products.description",
      "categories.name as category",
      "products.image",
      "products.rate",
      "products.count"
    )
    .join("categories", "categories.id", "=", "products.category_id")
    .where({ "products.id": id });

const insertProduct = async (product: Product) =>
  await knexInstance("products").insert(product);

const updateProduct = async (product: Product) =>
  await knexInstance("products").update(product).where({ id: product.id });

const deleteProduct = async (id: number) =>
  await knexInstance("products").delete().where({ id });

export default {
  selectAllProducts,
  selectProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
