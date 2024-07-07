import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import { routes } from "../src/routes";
import { connectToMongoDB } from "./mongoose";
import log4js from "log4js";
import { logger } from "./logger";

const app = express();
connectToMongoDB();

app.use(express.json());

app.use(log4js.connectLogger(logger, { level: "info" }));

app.use(routes);

app.listen(8000, () => {
  logger.info("Comment Service started on port 8000 🚀");
});
