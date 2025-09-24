import express from "express";
import { getAllCrops, getCrop, createCrop, updateCrop, deleteCrop, getCurrentCrop } from "../controllers/cropController.js";
import { verifyAccessToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyAccessToken, createCrop);
router.get("/", verifyAccessToken, getAllCrops);
router.get("/current", verifyAccessToken, getCurrentCrop);
router.get("/:id", verifyAccessToken, getCrop);
router.put("/:id", verifyAccessToken, updateCrop);
router.delete("/:id", verifyAccessToken, deleteCrop);

export default router;