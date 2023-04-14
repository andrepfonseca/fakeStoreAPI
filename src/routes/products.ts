import { Router } from "express";
import productsController from "../controllers/productsController";
const router: Router = Router();

router.get("/", productsController.index);
router.get("/:id", productsController.show);
router.post("/", productsController.insert);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.remove);

export { router };
