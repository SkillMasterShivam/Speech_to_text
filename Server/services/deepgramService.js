import fs from "fs/promises";

const DEEPGRAM_LISTEN_URL =
  "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true";

export const transcribeAudioFile = async (audioFilePath, mimeType) => {
  if (!process.env.DEEPGRAM_API_KEY) {
    const error = new Error("DEEPGRAM_API_KEY is missing from environment variables.");
    error.statusCode = 500;
    throw error;
  }

  try {
    const audioBuffer = await fs.readFile(audioFilePath);

    const response = await fetch(DEEPGRAM_LISTEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
        "Content-Type": mimeType,
      },
      body: audioBuffer,
    });

    const result = await response.json();

    if (!response.ok) {
      const message = result.err_msg || result.message || "Deepgram transcription failed.";
      const error = new Error(message);
      error.statusCode = response.status;
      throw error;
    }

    const transcript = result.results?.channels?.[0]?.alternatives?.[0]?.transcript?.trim();

    if (!transcript) {
      const error = new Error("Deepgram returned an empty transcription.");
      error.statusCode = 422;
      throw error;
    }

    return transcript;
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }

    const apiError = new Error(error.message || "Unable to transcribe audio with Deepgram.");
    apiError.statusCode = 502;
    throw apiError;
  }
};
