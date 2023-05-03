import { Request, Response } from "express";
import { Product } from "../types";
import productsServices from "../services/productsServices";

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit: any = req.query.limit;
    const sort: any = req.query.sort;
    const productsArray = await productsServices.getAllProducts({
      limit,
      sort,
    });

    res.status(200).send(productsArray);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const product = await productsServices.getProductById(id);

    res.status(200).send(product);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, price, description, category, image, rating } = req.body;
    const newProduct = {
      title,
      price,
      description,
      image,
      rating,
      category,
    };

    const insertedProduct = await productsServices.postProduct(newProduct);

    res.status(201).send(insertedProduct);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    const { title, price, description, category, image, rating } = req.body;

    const product: Product = {
      id,
      title,
      price,
      category,
      description,
      image,
      rate: rating.rate,
      count: rating.count,
    };
    const addedProduct = await productsServices.putProduct(product);

    res.status(201).send(addedProduct);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    await productsServices.removeProduct(id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { index, show, insert, update, remove };
