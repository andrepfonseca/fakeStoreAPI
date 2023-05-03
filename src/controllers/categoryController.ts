import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Category, Product } from "../types";
import categoryServices from "../services/categoryServices";

const knexInstance = knex(config);

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const category: string = req.params.category;

    const productsFromCategory =
      await categoryServices.getAllProductsFromCategory(category);

    res.status(200).send(productsFromCategory);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { show };
