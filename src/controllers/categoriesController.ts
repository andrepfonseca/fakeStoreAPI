import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Category } from "../types";
import { Knex } from "knex";

const knexInstance: Knex = knex(config);

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const category: Category[] = await knexInstance("categories").select("*");
    res.status(200).send(category);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const category: Category[] = await knexInstance("categories")
      .select("*")
      .where({ "categories.id": id });
    if (!category.length) {
      throw new Error("Category not found");
    }
    res.status(200).send(category[0]);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name }: { name: string } = req.body;

    const id: number[] = await knexInstance("categories").insert({ name });
    res.status(201).send({
      id: id[0],
      name,
    });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const { name }: { name: string } = req.body;

    await knexInstance("categories").update({ name }).where({ id });
    res.status(201).send({
      id,
      name,
    });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);

    const category: number = await knexInstance("categories")
      .delete()
      .where({ id });
    if (!category) throw new Error("Category does not exist");
    res.status(200).json({ message: "Category deleted" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { index, show, insert, update, remove };
