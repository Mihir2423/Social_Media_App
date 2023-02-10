import express from "express";
import { chatChat, userChats, findChat } from "../controller/chatController.js";
import protect from "../middleware/auth.js";

const route = express.Router();

route.post("/", protect, chatChat);
route.get("/:userId", protect, userChats);
route.get("/find/:firstId/:secondId", protect, findChat);

export default route;
