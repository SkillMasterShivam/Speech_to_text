import express from "express";
import { uploadAudio } from "../middleware/uploadMiddleware.js";
import {
  getTranscriptionById,
  getTranscriptionHistory,
  handleAudioUpload,
} from "../controllers/uploadController.js";
import asyncHandler from "../middleware/asyncHandler.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/audio", verifyJWT, uploadAudio.single("audio"), asyncHandler(handleAudioUpload));
router.get("/history", verifyJWT, asyncHandler(getTranscriptionHistory));
router.get("/history/:id", verifyJWT, asyncHandler(getTranscriptionById));

export default router;
