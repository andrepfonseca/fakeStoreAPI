import knex from "knex";
import { Knex } from "knex";
import config from "../../knexfile";
import { Product } from "../types";

const knexInstance: Knex = knex(config);

const selectAllProducts = (): Promise<Product[]> =>
  knexInstance("products")
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

const selectProductById = (id: number): Promise<Product[]> =>
  knexInstance("products")
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

const insertProduct = (product: Product): Promise<number[]> =>
  knexInstance("products").insert(product);

const updateProduct = (product: Product): Promise<number> =>
  knexInstance("products").update(product).where({ id: product.id });

const deleteProduct = (id: number): Promise<number> =>
  knexInstance("products").delete().where({ id });

export default {
  selectAllProducts,
  selectProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
};
