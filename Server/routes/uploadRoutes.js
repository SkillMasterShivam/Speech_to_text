import express from "express";
import { uploadAudio } from "../middleware/uploadMiddleware.js";
import {
  getTranscriptionById,
  getTranscriptionHistory,
  handleAudioUpload,
} from "../controllers/uploadController.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

router.post("/audio", uploadAudio.single("audio"), asyncHandler(handleAudioUpload));
router.get("/history", asyncHandler(getTranscriptionHistory));
router.get("/history/:id", asyncHandler(getTranscriptionById));

export default router;
