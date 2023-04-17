import { router as productsRoutes } from "./products";

import { Router } from "express";

const router: Router = Router();

router.use("/products", productsRoutes);

export { router };
