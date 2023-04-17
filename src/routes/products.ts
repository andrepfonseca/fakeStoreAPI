import { Router } from "express";
import productsController from "../controllers/productsController";
import { category } from "./category";
import { categories } from "./categories";
const router: Router = Router();

router.use("/category", category);
router.use("/categories", categories);

router.get("/", productsController.index);
router.get("/:id", productsController.show);
router.post("/", productsController.insert);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.remove);

export { router };
