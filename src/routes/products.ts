import { Router } from "express";
import productsController from "../controllers/productsController";
import { category } from "./category";
import { categories } from "./categories";
import middleware from "../middlewares/dataValidator";

const router: Router = Router();

router.use("/category", category);
router.use("/categories", categories);

router.get("/", productsController.index);
router.get("/:id", middleware.idDataValidator, productsController.show);
router.post("/", middleware.productDataValidator, productsController.insert);
router.put(
  "/:id",
  middleware.idDataValidator,
  middleware.productDataValidator,
  productsController.update
);
router.delete("/:id", middleware.idDataValidator, productsController.remove);

export { router };
