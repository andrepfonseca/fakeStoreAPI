/* eslint-disable @typescript-eslint/no-var-requires */
import * as dotenv from "dotenv";
import express, { Express } from "express";
import { router } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
const cors = require("cors");

dotenv.config();
const app: Express = express();

app.use(cors());

app.use(express.json());
app.use("/", router);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => console.log(`App Listening on port ${port}...`));
