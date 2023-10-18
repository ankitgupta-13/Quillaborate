import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user";
import cors from "cors";
import docRoutes from "./routes/document";
dotenv.config();
const app = express();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(`DB connection error: ${err}`);
  }
};

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err}`);
});

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://quillaborate.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

app.use("/api/user", userRoutes);
app.use("/api/doc", docRoutes);

app.listen(8000, () => {
  connectDB();
  console.log("Server is running");
});
