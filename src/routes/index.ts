import { router as productsRoutes } from "./products";
import { router as categoriesRoutes } from "./categories";
import { Router } from "express";

const router: Router = Router();

router.use("/products", productsRoutes);
router.use("/categories", categoriesRoutes);

export { router };
