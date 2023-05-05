import { NextFunction, Request, Response } from "express";
import categoriesServices from "../services/categoriesServices";

const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categoriesArray = await categoriesServices.getCategoriesNames();

    res.status(200).send(categoriesArray);
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

    const category = await categoriesServices.getCategoryById(id);

    res.status(200).send(category);
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
    const { name }: { name: string } = req.body.category;
    console.log(name);
    const createdCategory = await categoriesServices.createCategory(name);

    res.status(201).send(createdCategory);
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
    const id: number = parseInt(req.params.id);
    const { name }: { name: string } = req.body.category;

    const category = await categoriesServices.putCategory(name, id);

    res.status(201).send(category);
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

    const category = await categoriesServices.removeCategory(id);

    res.status(200).json(category);
  } catch (error: any) {
    next(error);
  }
};

export default { index, show, insert, update, remove };
