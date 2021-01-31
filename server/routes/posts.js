import express from "express";
import {
  getPosts,
  createPost,
  likePost,
  ratingPost
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.put("/action", likePost);
router.post("/rating", ratingPost);

export default router;
