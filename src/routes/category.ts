import { Router } from "express";
import categoryController from "../controllers/categoryController";
const category: Router = Router();

category.get("/:category", categoryController.show);

export { category };
