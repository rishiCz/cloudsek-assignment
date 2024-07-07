import { Schema } from "mongoose";
import mongoose from "mongoose";

const userPost = new Schema({
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, select: false },
    title: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  });

  const posts = mongoose.model('post', userPost);
  export default posts