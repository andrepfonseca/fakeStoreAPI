import { Router } from "express";
import { router as productsRoutes } from "./products";
import usersController from "../controllers/usersController";

const router: Router = Router();

router.use("/products", productsRoutes);
router.post("/users", usersController.insert);
router.put("/users/:id", usersController.update);
router.post("/users/login", usersController.login);

export { router };
