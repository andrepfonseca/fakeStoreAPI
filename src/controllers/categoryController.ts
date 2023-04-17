import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Category, Product } from "../types";

const knexInstance = knex(config);

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const category: string = req.params.category;
    const findCategory: Category[] = await knexInstance("categories")
      .select("id")
      .where({ name: category });
    if (!findCategory[0]) {
      throw new Error(`Category not found!`);
    }
    const productsFromCategory: Product[] = await knexInstance("products")
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
      .where({ "products.category_id": findCategory[0].id });
    const formattedProducts: Product[] = productsFromCategory.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: {
          rate: product.rate,
          count: product.count,
        },
      };
    });
    res.status(200).send(formattedProducts);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { show };
