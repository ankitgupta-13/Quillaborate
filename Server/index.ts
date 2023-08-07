import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user";

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

app.use("/api/user", userRoutes);

app.listen(8000, () => {
  connectDB();
  console.log("Server is running");
});
