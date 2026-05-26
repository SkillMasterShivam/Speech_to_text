import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { ensureDirectoryExists } from "../utils/fileUtils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = path.join(__dirname, "..", "uploads", "audio");

ensureDirectoryExists(uploadDirectory);

const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/x-wav", "audio/mp4", "audio/x-m4a"];
const allowedExtensions = [".mp3", ".wav", ".m4a"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const safeBaseName = path
      .basename(file.originalname, fileExtension)
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .toLowerCase();

    cb(null, `${Date.now()}-${safeBaseName}${fileExtension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileExtension = path.extname(file.originalname).toLowerCase();

  if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(fileExtension)) {
    return cb(null, true);
  }

  const error = new Error("Invalid file type. Only mp3, wav, and m4a audio files are allowed.");
  error.statusCode = 400;
  return cb(error);
};

export const uploadAudio = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});
