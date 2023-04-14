import { Router } from "express";
import categoriesController from "../controllers/categoriesController";
const router: Router = Router();

router.get("/", categoriesController.index);
router.get("/:id", categoriesController.show);
router.post("/", categoriesController.insert);
router.put("/:id", categoriesController.update);
router.delete("/:id", categoriesController.remove);

export { router };
