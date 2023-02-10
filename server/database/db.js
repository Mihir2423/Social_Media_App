import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const Connection = () => {
  const MongoDb_Url = `mongodb://${USERNAME}:${PASSWORD}@ac-iyn8ok9-shard-00-00.0it2sxo.mongodb.net:27017,ac-iyn8ok9-shard-00-01.0it2sxo.mongodb.net:27017,ac-iyn8ok9-shard-00-02.0it2sxo.mongodb.net:27017/?ssl=true&replicaSet=atlas-kgyadh-shard-0&authSource=admin&retryWrites=true&w=majority`;
  mongoose.set("strictQuery", false);
  mongoose.connect(MongoDb_Url, { useNewUrlParser: true });
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

export default Connection