import express from "express";
import { uploadAudio } from "../middleware/uploadMiddleware.js";
import { handleAudioUpload } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/audio", uploadAudio.single("audio"), handleAudioUpload);

export default router;
