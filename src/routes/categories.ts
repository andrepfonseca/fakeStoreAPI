import { Router } from "express";
import categoriesController from "../controllers/categoriesController";
const categories: Router = Router();

categories.get("/", categoriesController.index);
categories.get("/:id", categoriesController.show);
categories.post("/", categoriesController.insert);
categories.put("/:id", categoriesController.update);
categories.delete("/:id", categoriesController.remove);

export { categories };
