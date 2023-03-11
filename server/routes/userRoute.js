import express from 'express'
import { deleteUser, getUser, updateUser, followUser, unFollowUser, getAllUser } from '../controller/userController.js'
import protect from "../middleware/auth.js";

const route = express.Router()

route.get("/", getAllUser)
route.get('/:id', protect, getUser)
route.put('/:id', protect, updateUser)
route.delete("/:id", protect, deleteUser)
route.put("/:id/follow", protect, followUser)
route.put("/:id/unfollow", protect, unFollowUser)

export default route 