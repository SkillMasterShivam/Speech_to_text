import mongoose from "mongoose";

const transcriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  originalFileName: {
    type: String,
    required: true,
    trim: true,
  },
  fileName: {
    type: String,
    required: true,
    trim: true,
  },
  audioFilePath: {
    type: String,
    default: null,
  },
  mimeType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  transcriptionText: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* ── Compound index for the primary query pattern ── */
transcriptionSchema.index({ userId: 1, createdAt: -1 });

const Transcription = mongoose.model("Transcription", transcriptionSchema);

export default Transcription;
