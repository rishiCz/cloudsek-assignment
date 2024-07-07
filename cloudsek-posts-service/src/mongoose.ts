import mongoose from "mongoose";
import { logger } from "./logger";


const mongoUrl = process.env.MONGO_URL || "";

export const connectToMongoDB = async () => {
    try{
        logger.info('Connecting to MongoDB 🔃')
        await mongoose.connect(mongoUrl);
        logger.info('Connected to MongoDB 🍃')
    }catch(e){
        logger.error("Could not connect to MongoDB ⭕")
        logger.error(e)
    }
};