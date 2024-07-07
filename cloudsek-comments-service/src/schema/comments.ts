import mongoose from "mongoose";
import { Schema } from "mongoose";

const comments = new Schema({
  postId: { type: String, required: true },
  isDeleted: { type: Boolean, default: false, select: false },
  text: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const Comment = mongoose.model("comment", comments);
export default Comment;
