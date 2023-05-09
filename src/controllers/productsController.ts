import { NextFunction, Request, Response } from "express";
import { Product } from "../types";
import productsServices from "../services/productsServices";

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const queryParams: any = {
      limit: req.query.limit,
      sort: req.query.sort,
    };

    const productsArray: Product[] = await productsServices.getAllProducts(
      queryParams
    );

    res.status(200).send(productsArray);
  } catch (error: any) {
    next(error);
  }
};

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    const product: Product = await productsServices.getProductById(id);

    res.status(200).send(product);
  } catch (error: any) {
    next(error);
  }
};

const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product: Product = req.body;

    const insertedProduct: Product = await productsServices.postProduct(
      product
    );

    res.status(201).send(insertedProduct);
  } catch (error: any) {
    next(error);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productObject: { id: number; product: Product } = {
      id: parseInt(req.params.id),
      product: req.body,
    };

    const updatedProduct: Product = await productsServices.putProduct(
      productObject
    );

    res.status(201).send(updatedProduct);
  } catch (error: any) {
    next(error);
  }
};

const patch = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productObject: { id: number; partialProduct: Product } = {
      id: parseInt(req.params.id),
      partialProduct: req.body,
    };

    const updatedProduct: Product = await productsServices.patchProduct(
      productObject
    );

    res.status(201).send(updatedProduct);
  } catch (error: any) {
    next(error);
  }
};

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    await productsServices.removeProduct(id);

    res
      .status(200)
      .json({ message: `Product id:${id} was deleted successfully` });
  } catch (error: any) {
    next(error);
  }
};

export default { index, show, insert, update, patch, remove };
