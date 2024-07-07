import { configDotenv } from "dotenv";
configDotenv()
import express from "express";
import { routes } from "../src/routes";
import { connectToMongoDB } from "./mongoose";
import log4js from 'log4js';
import { logger } from "./logger";




const app = express();
connectToMongoDB();

app.use(express.json());

// Use log4js for Express logging
app.use(log4js.connectLogger(logger, { level: 'info' }));

app.use(routes);

app.listen(8001, () => {
  logger.info("Post Service started on port 8001 🚀");
});

// Log any unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
});