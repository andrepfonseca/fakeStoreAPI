import knex from "knex";
import { Knex } from "knex";
import config from "../../knexfile";
import { Product } from "../types";

const knexInstance: Knex = knex(config);

const selectAllProductsFromCategory = (id: number): Promise<Product[]> =>
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
    .where({ "products.category_id": id });

export default {
  selectAllProductsFromCategory,
};
