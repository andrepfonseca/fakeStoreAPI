import { NextFunction, Request, Response } from "express";
import categoryServices from "../services/categoryServices";

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category: string = req.params.category;

    const productsFromCategory =
      await categoryServices.getAllProductsFromCategory(category);

    res.status(200).send(productsFromCategory);
  } catch (error: any) {
    next(error);
  }
};

export default { show };
