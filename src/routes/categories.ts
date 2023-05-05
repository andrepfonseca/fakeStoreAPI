import { Router } from "express";
import categoriesController from "../controllers/categoriesController";
import middleware from "../middlewares/dataValidator";
import auth from "../middlewares/auth";

const categories: Router = Router();

categories.get("/", categoriesController.index);
categories.get("/:id", middleware.idDataValidator, categoriesController.show);
categories.post(
  "/",
  auth.authToken,
  middleware.categoryDataValidator,
  categoriesController.insert
);
categories.put(
  "/:id",
  auth.authToken,
  middleware.idDataValidator,
  middleware.categoryDataValidator,
  categoriesController.update
);
categories.delete(
  "/:id",
  auth.authToken,
  middleware.idDataValidator,
  categoriesController.remove
);

export { categories };
