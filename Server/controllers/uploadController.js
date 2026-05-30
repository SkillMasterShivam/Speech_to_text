import fs from "fs/promises";
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

  const filePath = req.file.path;

  try {
    const transcriptionText = await transcribeAudioFile(filePath, req.file.mimetype);

    const transcription = await Transcription.create({
      userId: req.user._id,
      originalFileName: req.file.originalname,
      fileName: req.file.filename,
      audioFilePath: null,
      mimeType: req.file.mimetype,
      size: req.file.size,
      transcriptionText,
    });

    // Clean up: delete the uploaded audio file after processing
    await fs.unlink(filePath).catch(() => {});

    return res.status(201).json({
      success: true,
      message: "Audio uploaded and transcribed successfully",
      data: {
        id: transcription._id,
        originalFileName: transcription.originalFileName,
        fileName: transcription.fileName,
        mimeType: transcription.mimeType,
        size: transcription.size,
        transcriptionText: transcription.transcriptionText,
        createdAt: transcription.createdAt,
      },
    });
  } catch (err) {
    // Clean up file even if transcription fails
    await fs.unlink(filePath).catch(() => {});
    throw err;
  }
};

export const getTranscriptionHistory = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const skip = (page - 1) * limit;

  const [transcriptions, total] = await Promise.all([
    Transcription.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("originalFileName fileName transcriptionText size createdAt")
      .lean(),
    Transcription.countDocuments({ userId: req.user._id }),
  ]);

  return res.status(200).json({
    success: true,
    count: transcriptions.length,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: transcriptions,
  });
};

export const getTranscriptionById = async (req, res) => {
  const transcription = await Transcription.findOne({
    _id: req.params.id,
    userId: req.user._id,
  }).lean();

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
