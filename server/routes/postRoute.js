import express from 'express'
import { createPost, getPost, updatePost, deletePost, likePost, getTimelinePosts } from '../controller/postController.js'
import protect from "../middleware/auth.js";

const route = express.Router()

route.post("/", protect, createPost)
route.get("/:id", protect, getPost)
route.put("/:id", protect, updatePost)
route.delete("/:id", protect, deletePost)
route.put("/:id/like", protect, likePost)
route.get("/:id/timeLine", protect, getTimelinePosts)

export default route 