<p align="center">
  <img src="Client/public/favicon.svg" alt="SpeechFlow Logo" width="80" />
</p>

<h1 align="center">SpeechFlow — Speech-to-Text Web Application</h1>

<p align="center">
  <strong>Convert audio to text instantly with the power of AI</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Deepgram-Nova--2-13EF93?style=for-the-badge&logo=deepgram&logoColor=white" alt="Deepgram" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/PRs-welcome-blue?style=flat-square" alt="PRs Welcome" />
</p>

---

## 📖 Overview

**SpeechFlow** is a full-stack MERN web application that converts audio files to text using Deepgram's industry-leading **Nova-2** AI speech recognition model. Users can upload audio files (MP3, WAV, M4A), receive fast and accurate transcriptions, and browse their complete transcription history — all through a clean, responsive interface.

Built with **React 19**, **Express 5**, **MongoDB**, and **Tailwind CSS 4**, SpeechFlow demonstrates modern full-stack development practices including RESTful API design, file upload handling, third-party API integration, and comprehensive error handling.

---

## ✨ Features

| Feature | Description |
| :--- | :--- |
| 🎤 **Audio Upload** | Upload audio files with intuitive drag-and-drop or click-to-browse |
| 🤖 **AI Transcription** | Real-time speech-to-text conversion powered by Deepgram Nova-2 |
| 📜 **Transcription History** | Browse all past transcriptions stored in MongoDB |
| 📋 **Copy to Clipboard** | One-click copy of transcription text |
| 💾 **Download as .txt** | Export any transcription as a downloadable text file |
| ✅ **File Validation** | Strict validation for file type (MP3, WAV, M4A) and size (max 25 MB) |
| 🩺 **Health Monitoring** | Real-time backend connectivity status indicator |
| 📱 **Responsive Design** | Modern UI with smooth animations, optimized for all screen sizes |
| 🛡️ **Error Handling** | Comprehensive server and client-side error handling with user-friendly messages |

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
| :--- | :--- | :--- |
| **Frontend** | React | 19 |
| **Build Tool** | Vite | 8 |
| **Styling** | Tailwind CSS | 4 |
| **Backend** | Node.js + Express | 5 |
| **Database** | MongoDB + Mongoose | 9 |
| **Speech-to-Text** | Deepgram Nova-2 API | — |
| **File Upload** | Multer | 2 |
| **Logging** | Morgan | 1.10 |
| **Dev Server** | Nodemon | 3 |
| **Linting** | ESLint | 10 |

---

## 📁 Project Structure

```
Speech_to_text/
├── Client/                          # React frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   ├── components/
│   │   │   ├── FileUploadCard.jsx   # Drag-and-drop file upload UI
│   │   │   ├── HistoryList.jsx      # Transcription history display
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   └── TranscriptionResult.jsx  # Transcription output card
│   │   ├── constants/
│   │   ├── layouts/
│   │   │   └── AppLayout.jsx        # Page layout wrapper
│   │   ├── pages/
│   │   │   └── Home.jsx             # Main application page
│   │   ├── services/
│   │   │   └── transcriptionService.js  # API communication layer
│   │   ├── App.jsx                  # Root component
│   │   ├── index.css                # Global styles & Tailwind imports
│   │   └── main.jsx                 # Application entry point
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── Server/                          # Express backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection setup
│   ├── controllers/
│   │   └── uploadController.js      # Request handlers for uploads
│   ├── middleware/
│   │   ├── asyncHandler.js          # Async error wrapper
│   │   ├── errorHandler.js          # Global error handling middleware
│   │   ├── notFound.js              # 404 handler
│   │   └── uploadMiddleware.js      # Multer configuration & file validation
│   ├── models/
│   │   └── Transcription.js         # Mongoose schema for transcriptions
│   ├── routes/
│   │   ├── healthRoutes.js          # Health check endpoint
│   │   └── uploadRoutes.js          # Audio upload & history routes
│   ├── services/
│   │   └── deepgramService.js       # Deepgram API integration
│   ├── uploads/
│   │   └── audio/                   # Uploaded audio file storage
│   ├── utils/
│   │   └── fileUtils.js             # File system utilities
│   ├── app.js                       # Express app configuration
│   ├── server.js                    # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed and configured:

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **MongoDB Atlas** account (or a local MongoDB instance) — [Sign Up](https://www.mongodb.com/atlas)
- **Deepgram API key** (free tier available) — [Get API Key](https://deepgram.com)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/SkillMasterShivam/Speech_to_text.git
cd Speech_to_text
```

**2. Install server dependencies**

```bash
cd Server
npm install
```

**3. Install client dependencies**

```bash
cd ../Client
npm install
```

**4. Configure environment variables**

Create a `.env` file inside the `Server/` directory:

```bash
# Server/.env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/speechflow?retryWrites=true&w=majority
DEEPGRAM_API_KEY=your_deepgram_api_key_here
CLIENT_URL=http://localhost:5173
```

> **💡 Tip:** Get your free Deepgram API key at [console.deepgram.com](https://console.deepgram.com). The free tier includes $200 in credit — more than enough for development and testing.

### Running Locally

Open **two terminal windows** and run:

**Terminal 1 — Start the backend server:**

```bash
cd Server
npm run dev
```

The server will start on `http://localhost:5000` with hot-reload enabled via Nodemon.

**Terminal 2 — Start the frontend dev server:**

```bash
cd Client
npm run dev
```

The client will start on `http://localhost:5173` with Vite's HMR enabled.

**5. Open your browser**

Navigate to **[http://localhost:5173](http://localhost:5173)** and start transcribing! 🎉

---

## 📡 API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint | Description | Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Server health check | — |
| `POST` | `/api/uploads/audio` | Upload audio file & get transcription | `multipart/form-data` (field: `audio`) |
| `GET` | `/api/uploads/history` | Retrieve all transcription records | — |
| `GET` | `/api/uploads/history/:id` | Retrieve a single transcription by ID | — |

### Example Request

```bash
# Upload an audio file
curl -X POST http://localhost:5000/api/uploads/audio \
  -F "audio=@./sample-audio.mp3"
```

### Example Response

```json
{
  "success": true,
  "message": "Audio uploaded and transcribed successfully",
  "data": {
    "id": "683829a1f4e2b3001c8d1234",
    "originalFileName": "sample-audio.mp3",
    "fileName": "1716900001-sample-audio.mp3",
    "audioFilePath": "uploads/audio/1716900001-sample-audio.mp3",
    "mimeType": "audio/mpeg",
    "size": 245760,
    "transcriptionText": "Hello, this is a sample transcription from Deepgram Nova-2.",
    "createdAt": "2026-05-29T08:51:00.000Z"
  }
}
```

---

## 🔐 Environment Variables

| Variable | Required | Description | Default |
| :--- | :---: | :--- | :--- |
| `PORT` | No | Port for the Express server | `5000` |
| `NODE_ENV` | No | Application environment (`development` / `production`) | `development` |
| `MONGO_URI` | **Yes** | MongoDB connection string (Atlas or local) | — |
| `DEEPGRAM_API_KEY` | **Yes** | API key from [Deepgram Console](https://console.deepgram.com) | — |
| `CLIENT_URL` | No | Frontend origin URL for CORS configuration | `http://localhost:5173` |

---

## ⚙️ How It Works

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   React Client   │────▶│  Express Server  │────▶│   Deepgram API   │
│   (Vite + TW)    │◀────│  (Node.js)       │◀────│   (Nova-2)       │
└──────────────────┘     └────────┬─────────┘     └──────────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │    MongoDB       │
                         │  (Transcriptions)│
                         └──────────────────┘
```

1. **Upload** — The user selects or drags an audio file (MP3, WAV, or M4A) into the React frontend.
2. **Transfer** — The file is sent to the Express backend as `multipart/form-data` via the `/api/uploads/audio` endpoint.
3. **Validation** — Multer middleware validates the file type and enforces the 25 MB size limit. Invalid files are rejected with a clear error message.
4. **Transcription** — The backend reads the audio buffer and sends it to the **Deepgram Nova-2 API** with smart formatting enabled.
5. **Storage** — The transcription result, along with file metadata, is saved to **MongoDB** via Mongoose.
6. **Response** — The transcription text is returned to the frontend and displayed in the result card.
7. **History** — On page load, the frontend fetches all past transcriptions from MongoDB and renders them in a history list, sorted newest first.

---

## 🛡️ Error Handling

SpeechFlow implements multi-layered error handling to ensure a smooth user experience:

| Layer | What's Handled |
| :--- | :--- |
| **File Validation** | Invalid file types rejected before upload; file size capped at 25 MB |
| **Multer Errors** | `LIMIT_FILE_SIZE` and other Multer-specific errors caught with descriptive messages |
| **Deepgram API** | Missing API key, failed transcription, and empty results are all handled gracefully |
| **MongoDB** | Connection failures caught at startup; validation errors and cast errors handled in middleware |
| **Express Middleware** | Global `errorHandler` normalizes all errors into a consistent `{ success, message }` response |
| **React Frontend** | API errors surfaced as user-friendly messages; backend status shown via health indicator |

---

## 📸 Screenshots

> 🚧 **Screenshots coming soon** — The UI features a clean, modern design with drag-and-drop upload, real-time transcription display, and a history timeline.

---

## 🔮 Future Enhancements

- [ ] 🎙️ **Live Audio Recording** — Record directly from the browser via MediaRecorder API
- [ ] 🔒 **User Authentication** — Sign up / login with private transcription history
- [ ] 🌐 **Multi-Language Support** — Transcribe audio in 30+ languages supported by Deepgram
- [ ] ▶️ **Audio Playback** — Play back uploaded audio files alongside their transcriptions
- [ ] 📄 **PDF Export** — Download transcriptions as formatted PDF documents
- [ ] ⚡ **Real-Time Streaming** — Live transcription via WebSocket streaming API
- [ ] 🏷️ **Tagging & Search** — Organize transcriptions with tags and full-text search

---

## 👤 Author

**Yagh Chaudhary**

Built as part of the **Labmentix Internship Program**.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Yagh Chaudhary

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  Made with ❤️ and ☕ by <strong>Yagh Chaudhary</strong>
</p>
