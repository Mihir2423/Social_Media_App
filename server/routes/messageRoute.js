import express from 'express'
import { addMessage, getMessages } from '../controller/messageController.js'
import protect from "../middleware/auth.js";

const route = express.Router()

route.post("/",protect, addMessage)
route.get("/:chatId",protect, getMessages)

export default route