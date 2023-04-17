import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Category, Product } from "../types";

const knexInstance = knex(config);

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products: Product[] = await knexInstance("products")
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

    const formattedProduct: Product[] = products.map((product: Product) => {
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
    res.status(200).send(formattedProduct);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    const product: Product[] = await knexInstance("products")
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

    if (!product.length) {
      throw new Error("Product not found");
    }

    const formattedProduct: Product = {
      id,
      title: product[0].title,
      price: product[0].price,
      description: product[0].description,
      category: product[0].category,
      image: product[0].image,
      rating: {
        rate: product[0].rate,
        count: product[0].count,
      },
    };

    res.status(200).send(formattedProduct);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, price, description, category, image, rating } = req.body;

    const findCategory: Category[] = await knexInstance("categories")
      .select("id")
      .where({ name: category });

    const categoryId: number | undefined = findCategory[0].id;

    if (!categoryId) {
      throw new Error(`Category ${category} does not exists`);
    }

    const product: Product = {
      title,
      price,
      category_id: categoryId,
      description,
      image,
      rate: rating.rate,
      count: rating.count,
    };

    const id: number[] = await knexInstance("products").insert(product);

    res.status(201).send({
      id: id[0],
      title,
      price,
      category_id: categoryId,
      description,
      image,
      rating: {
        rate: rating.rate,
        count: rating.count,
      },
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

    const product: Product = {
      id,
      title,
      price,
      category_id: categoryId,
      description,
      image,
      rate: rating.rate,
      count: rating.count,
    };
    const addedProductId: number = await knexInstance("products")
      .update(product)
      .where({ id });
    if (!addedProductId) throw new Error("Product does not exist");
    res.status(201).send({
      id,
      title,
      price,
      category_id: categoryId,
      description,
      image,
      rating: {
        rate: rating.rate,
        count: rating.count,
      },
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
