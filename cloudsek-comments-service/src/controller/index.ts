import { Request, Response } from "express";
import comments from "../schema/comments";
import { CreateCommentDTO } from "../dto/createComment.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateCommentDTO } from "../dto/updateComment.dto";
import { logger } from "../logger";
import axios from "axios";

const postServiceUrl = process.env.POST_SERVICE_URL;

export const createComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  logger.info("Creating comment for a post");
  const body = req.body;

  try {
    logger.info("Validating comment DTO");
    const errors = await validate(plainToInstance(CreateCommentDTO, body));
    if (errors.length > 0) {
      logger.error("Validation failed for comment DTO");
      return res.status(400).json(errors);
    }

    const date = new Date();
    const { author, text, postId } = body;
    try {
      await axios.get(`${postServiceUrl}/${postId}`);
    } catch (error) {
      logger.error("Could not find post");
      res.status(404).json({ message: "Post not found" });
    }

    logger.info("Adding new record in MongoDB");
    const comment = await comments.create({
      postId,
      author,
      text,
      createdAt: date,
      updatedAt: date,
    });
    logger.info("Added new record in MongoDB");
    res.status(201).json(comment);
  } catch (error) {
    logger.error("Could not create comment");
    logger.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getOneComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  logger.info("Fetching one comment");
  try {
    const { commentId } = req.params;
    logger.info(`Searching for comment with ID: ${commentId}`);
    const comment = await comments.findOne({
      _id: commentId,
      isDeleted: false,
    });
    if (!comment) {
      logger.warn(`Comment with ID ${commentId} not found`);
      return res.status(404).json({ message: "Comment not found" });
    }
    logger.info("Comment found and returned");
    res.json(comment);
  } catch (error) {
    logger.error("Error fetching comment", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteOneComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  logger.info("Deleting one comment");
  try {
    const { commentId } = req.params;
    logger.info(`Attempting to delete comment with ID: ${commentId}`);
    const result = await comments.updateOne(
      { _id: commentId },
      { $set: { isDeleted: true } }
    );
    if (result.modifiedCount === 0) {
      logger.warn(`Comment with ID ${commentId} not found for deletion`);
      return res.status(404).json({ message: "Comment not found" });
    }
    logger.info(`Comment ${commentId} deleted successfully`);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    logger.error("Error deleting comment", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateComment = async (
  req: Request,
  res: Response
): Promise<any> => {
  logger.info("Updating comment");
  try {
    const body = req.body;

    logger.info("Validating update comment DTO");
    const errors = await validate(plainToInstance(UpdateCommentDTO, body));
    if (errors.length > 0) {
      logger.error("Validation failed for update comment DTO");
      return res.status(400).json(errors);
    }

    const { commentId } = req.params;
    const date = new Date();
    logger.info(`Attempting to update comment with ID: ${commentId}`);
    const result = await comments.updateOne(
      { _id: commentId },
      { text: body.text, updatedAt: date }
    );
    if (result.modifiedCount === 0) {
      logger.warn(`Comment with ID ${commentId} not found for update`);
      return res.status(404).json({ message: "Comment not found" });
    }
    logger.info(`Comment ${commentId} updated successfully`);
    res.json({ message: "Comment updated successfully" });
  } catch (error) {
    logger.error("Error updating comment", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPostComments = async (
  req: Request,
  res: Response
): Promise<any> => {
  logger.info("Fetching all comments for a post");
  try {
    const { postId } = req.params;
    logger.info(`Searching for comments of post with ID: ${postId}`);
    const comment = await comments.find({
      postId: postId,
      isDeleted: false,
    });
    logger.info(`Found ${comment.length} comments for post ${postId}`);
    res.json(comment);
  } catch (error) {
    logger.error("Error fetching post comments", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAllPostComments = async (
  req: Request,
  res: Response
): Promise<any> => {
  logger.info("Deleting all comments for a post");
  try {
    const { postId } = req.params;
    logger.info(
      `Attempting to delete all comments for post with ID: ${postId}`
    );
    const result = await comments.updateMany(
      { postId: postId },
      { $set: { isDeleted: true } }
    );
    logger.info(`Deleted ${result.modifiedCount} comments for post ${postId}`);
    res.json({
      message: "Comments deleted successfully",
      count: result.modifiedCount,
    });
  } catch (error) {
    logger.error("Error deleting post comments", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllComments = async (
  req: Request,
  res: Response
): Promise<any> => {
  logger.info("Fetching all comments");
  try {
    const comment = await comments.find();
    logger.info(`Found ${comment.length} comments`);
    res.json(comment);
  } catch (error) {
    logger.error("Error fetching all comments", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
