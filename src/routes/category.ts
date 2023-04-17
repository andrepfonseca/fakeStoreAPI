import { Router } from "express";
import categoryController from "../controllers/categoryController";
const router: Router = Router();

router.get("/:category", categoryController.showProducts);

export { router };
