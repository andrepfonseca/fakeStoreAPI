import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Category, ProductForDB, ProductToReturn } from "../types";

const knexInstance = knex(config);

const showProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const category: string = req.params.category;
    const findCategory: Category[] = await knexInstance("categories")
      .select("id")
      .where({ name: category });
    if (!findCategory[0]) {
      throw new Error(`Category not found!`);
    }
    const productsFromCategory = await knexInstance("products")
      .select(
        "products.id",
        "products.title",
        "products.price",
        "products.description",
        "categories.name as category",
        "products.image",
        "products.rating"
      )
      .join("categories", "categories.id", "=", "products.category_id")
      .where({ "products.category_id": findCategory[0].id });
    res.status(200).send(productsFromCategory);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { showProducts };
