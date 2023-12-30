import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

import postsRoutes from "./routes/posts.js";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/posts", postsRoutes);

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_CONN);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error("Failed to connect");
  }
};

app.listen(PORT, () => {
  connect();
  console.log("Server connected to port 4000");
});
