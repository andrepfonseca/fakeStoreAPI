import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Category, Product, ProductForDB, ProductToReturn } from "../types";

const knexInstance = knex(config);

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products: ProductToReturn[] = await knexInstance("products")
      .select(
        "products.id",
        "products.title",
        "products.price",
        "products.description",
        "categories.name as category",
        "products.image",
        "products.rating"
      )
      .join("categories", "categories.id", "=", "products.category_id");

    res.status(200).send(products);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    const product: ProductToReturn[] = await knexInstance("products")
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
      .where({ "products.id": id });

    if (!product.length) {
      throw new Error("Product not found");
    }

    res.status(200).send(product[0]);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      price,
      description,
      category,
      image,
      rating,
    }: ProductToReturn = req.body;

    const findCategory: Category[] = await knexInstance("categories")
      .select("id")
      .where({ name: category });

    const categoryId: number | undefined = findCategory[0].id;

    if (!categoryId) {
      throw new Error(`Category ${category} does not exists`);
    }

    const product: ProductForDB = {
      title,
      price,
      category_id: categoryId,
      description,
      image,
      rating,
    };

    const id: number[] = await knexInstance("products").insert(product);

    res.status(201).send({
      id: id[0],
      ...product,
    });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    const { title, price, description, category, image, rating } = req.body;

    const findCategory: Category[] = await knexInstance("categories")
      .select("id")
      .where({ name: category });

    const categoryId: number | undefined = findCategory[0].id;

    if (!categoryId) {
      throw new Error(`Category ${category} does not exists`);
    }

    const product: ProductForDB = {
      id,
      title,
      price,
      category_id: categoryId,
      description,
      image,
      rating,
    };
    const addedProductId: number = await knexInstance("products")
      .update(product)
      .where({ id });
    if (!addedProductId) throw new Error("Product does not exist");
    res.status(201).send({
      ...product,
    });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    const productId: number = await knexInstance("products")
      .delete()
      .where({ id });
    if (!productId) throw new Error("Product does not exist");
    res.status(200).json({ message: "Product deleted" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { index, show, insert, update, remove };
