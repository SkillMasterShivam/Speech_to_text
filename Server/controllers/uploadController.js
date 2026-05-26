export const handleAudioUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Audio file is required. Please upload an mp3, wav, or m4a file.",
    });
  }

  return res.status(201).json({
    success: true,
    message: "Audio uploaded successfully",
    data: {
      originalName: req.file.originalname,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      folder: "uploads/audio",
      uploadedAt: new Date().toISOString(),
    },
  });
};
