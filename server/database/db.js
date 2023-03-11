import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const Connection = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
  mongoose.connection.on("connected", () => {
    console.log("Database Connected Successfully");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Database Disonnected ");
  });
  mongoose.connection.on("error", () => {
    console.log("Error in Connecting to Dataase");
  });
};

export default Connection;
