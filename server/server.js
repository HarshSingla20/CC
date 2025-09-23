import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { connectDB } from "./src/db/connection.js";

import authRoutes from "./src/routes/authRoute.js";

dotenv.config();

const app = express();

const Port = process.env.PORT || 8001;

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);

app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
    connectDB();
});