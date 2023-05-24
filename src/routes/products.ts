import { Router } from "express";
import productsController from "../controllers/productsController";
import { category } from "./category";
import { categories } from "./categories";
import auth from "../middlewares/auth";
import middleware from "../middlewares/dataValidator";

const router: Router = Router();

router.use("/category", category);
router.use("/categories", categories);

router.get("/", productsController.index);
router.get("/top3", productsController.top3);
router.get("/:id", middleware.idDataValidator, productsController.show);
router.post(
  "/",
  auth.authToken,
  middleware.productDataValidator,
  productsController.insert
);
router.put(
  "/:id",
  auth.authToken,
  middleware.idDataValidator,
  middleware.productDataValidator,
  productsController.update
);
router.patch(
  "/:id",
  auth.authToken,
  middleware.idDataValidator,
  middleware.partialProductDataValidator,
  productsController.patch
);
router.delete(
  "/:id",
  auth.authToken,
  middleware.idDataValidator,
  productsController.remove
);

export { router };
