import { router as productsRoutes } from "./products";
import { router as categoriesRoutes } from "./categories";
import { router as categoryRoutes } from "./category";
import { Router } from "express";

const router: Router = Router();

router.use("/categories", categoriesRoutes);
router.use("/", productsRoutes);
router.use("/category", categoryRoutes);

export { router };
