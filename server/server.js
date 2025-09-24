import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { connectDB } from "./src/db/connection.js";

import authRoute from "./src/routes/authRoute.js";
import cropRoute from "./src/routes/cropRoute.js";
import weatherRoute from "./src/routes/weatherRoute.js";

dotenv.config();

const app = express();
const Port = process.env.PORT || 8000;


app.use(cors({
  origin: process.env.VITE_API_BASE_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoute);
app.use("/api/crops", cropRoute);
app.use("/api/weather", weatherRoute);

app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
  connectDB();
});