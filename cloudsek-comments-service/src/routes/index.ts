import express from "express";
import {
  createComment,
  deleteAllPostComments,
  deleteOneComment,
  getAllComments,
  getAllPostComments,
  getOneComment,
  updateComment,
} from "../controller";

const route = express();

route.post("/comment", createComment);

route.get("/comment/:commentId", getOneComment);

route.delete("/comment/:commentId", deleteOneComment);

route.patch("/comment/:commentId", updateComment);

route.get("/comment", getAllComments);

route.get("/postcomments/:postId", getAllPostComments);

route.delete("/postcomments/:postId", deleteAllPostComments);

export { route as routes };
