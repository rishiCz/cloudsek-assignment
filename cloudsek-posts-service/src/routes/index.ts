import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controller";
import express from "express";

const route = express();

route.get("/post", getAllPosts);

route.post("/post", createPost);

route.get("/post/:postId", getPost);

route.delete("/post/:postId", deletePost);

route.patch("/post/:postId", updatePost);

export { route as routes };
