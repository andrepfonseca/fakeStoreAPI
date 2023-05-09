import * as dotenv from "dotenv";
import express, { Express } from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use("/", router);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => console.log(`App Listening on port ${port}...`));
