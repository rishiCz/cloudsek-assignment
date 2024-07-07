import { Request, Response } from "express";
import axios from "axios";
import posts from "../schema/post";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreatePostDTO } from "../dto/createPost.dto";
import { UpdatePostDTO } from "../dto/updatePost.dto";
import { logger } from "../logger";

const commentServiceUrl = process.env.COMMENT_SERVICE_URL;

export const getAllPosts = async (req: Request, res: Response) => {
  logger.info("Fetching all posts");
  try {
    const post = await posts.find();
    logger.info(`Found ${post.length} posts`);
    res.json(post);
  } catch (error: any) {
    logger.error("Error fetching all posts", error);
    res
      .status(500)
      .send({ message: "Error fetching posts", error: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  logger.info("Creating a new post");
  try {
    const body = req.body;

    logger.info("Validating create post DTO");
    const errors = await validate(plainToInstance(CreatePostDTO, body));
    if (errors.length > 0) {
      logger.warn("Validation failed for create post DTO");
      return res.status(400).json(errors);
    }

    const { author, title, image } = body;
    const date = new Date();
    logger.info("Adding new post to MongoDB");
    const post = await posts.create({
      author,
      title,
      image,
      createdAt: date,
      updatedAt: date,
    });
    logger.info(`Post created with ID: ${post._id}`);
    res.json({ post });
  } catch (error: any) {
    logger.error("Error creating post", error);
    res
      .status(500)
      .send({ message: "Error creating post", error: error.message });
  }
};

export const getPost = async (req: Request, res: Response) => {
  logger.info("Fetching a single post");
  try {
    const { postId } = req.params;
    logger.info(`Searching for post with ID: ${postId}`);
    const post = await posts.findOne({ _id: postId });
    if (!post) {
      logger.warn(`Post with ID ${postId} not found`);
      return res.status(404).send({ message: "Post not found" });
    }
    logger.info(`Post ${postId} found and returned`);
    res.json(post);
  } catch (error: any) {
    logger.error("Error fetching post", error);
    res
      .status(500)
      .send({ message: "Error fetching post", error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  logger.info("Deleting a post");
  try {
    const { postId } = req.params;
    logger.info(`Attempting to delete post with ID: ${postId}`);
    const post = await posts.deleteOne({ _id: postId });
    if (post.deletedCount === 0) {
      logger.warn(`Post with ID ${postId} not found for deletion`);
      return res.status(404).send({ message: "Post not found" });
    }

    logger.info(`Deleting comments for post ${postId}`);
    await axios.delete(`${commentServiceUrl}/postcomments/${postId}`);

    logger.info(`Post ${postId} and its comments deleted successfully`);
    res.json(post);
  } catch (error: any) {
    logger.error("Error deleting post", error);
    res
      .status(500)
      .send({ message: "Error deleting post", error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  logger.info("Updating a post");
  try {
    const body = req.body;

    logger.info("Validating update post DTO");
    const errors = await validate(plainToInstance(UpdatePostDTO, body));
    if (errors.length > 0) {
      logger.warn("Validation failed for update post DTO");
      return res.status(400).json(errors);
    }

    const { postId } = req.params;
    const { title, image } = req.body;
    const date = new Date();
    logger.info(`Attempting to update post with ID: ${postId}`);
    const post = await posts.updateOne(
      { _id: postId },
      { $set: { title, image, updatedAt: date } }
    );
    if (post.matchedCount === 0) {
      logger.warn(`Post with ID ${postId} not found for update`);
      return res.status(404).send({ message: "Post not found" });
    }
    logger.info(`Post ${postId} updated successfully`);
    res.json(post);
  } catch (error: any) {
    logger.error("Error updating post", error);
    res
      .status(500)
      .send({ message: "Error updating post", error: error.message });
  }
};
