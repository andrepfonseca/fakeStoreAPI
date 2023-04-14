import express, { Express } from "express";
import { router } from "./routes";

const app: Express = express();

app.use(express.json());

app.use("/api/v1", router);

const port: number = 3000;

app.listen(port, () => console.log(`App Listening on port ${port}...`));
