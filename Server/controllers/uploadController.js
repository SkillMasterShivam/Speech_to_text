import path from "path";
import Transcription from "../models/Transcription.js";
import { transcribeAudioFile } from "../services/deepgramService.js";

export const handleAudioUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Audio file is required. Please upload an mp3, wav, or m4a file.",
    });
  }

  const transcriptionText = await transcribeAudioFile(req.file.path, req.file.mimetype);
  const audioFilePath = path.relative(process.cwd(), req.file.path).replace(/\\/g, "/");

  const transcription = await Transcription.create({
    originalFileName: req.file.originalname,
    fileName: req.file.filename,
    audioFilePath,
    mimeType: req.file.mimetype,
    size: req.file.size,
    transcriptionText,
  });

  return res.status(201).json({
    success: true,
    message: "Audio uploaded and transcribed successfully",
    data: {
      id: transcription._id,
      originalFileName: transcription.originalFileName,
      fileName: transcription.fileName,
      audioFilePath: transcription.audioFilePath,
      mimeType: transcription.mimeType,
      size: transcription.size,
      transcriptionText: transcription.transcriptionText,
      createdAt: transcription.createdAt,
    },
  });
};

export const getTranscriptionHistory = async (req, res) => {
  const transcriptions = await Transcription.find()
    .sort({ createdAt: -1 })
    .select("originalFileName fileName audioFilePath transcriptionText createdAt");

  return res.status(200).json({
    success: true,
    count: transcriptions.length,
    data: transcriptions,
  });
};

export const getTranscriptionById = async (req, res) => {
  const transcription = await Transcription.findById(req.params.id);

  if (!transcription) {
    return res.status(404).json({
      success: false,
      message: "Transcription not found.",
    });
  }

  return res.status(200).json({
    success: true,
    data: transcription,
  });
};
