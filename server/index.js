import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Connection from './database/db.js';
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import postRoute from "./routes/postRoute.js"
import chatRoute from "./routes/chatRoute.js"
import messageRoute from "./routes/messageRoute.js"
import { notFound, errorHandler } from "./middleware/errorMiddleWare.js";

dotenv.config();

const app = express()

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

Connection();

app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/post", postRoute)
app.use("/chat", chatRoute)
app.use("/message", messageRoute)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT

app.listen(PORT, console.log(`Server is running on port ${PORT}`))