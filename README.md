# SpeechFlow

SpeechFlow is a MERN-ready speech-to-text web application. The current MVP lets users upload audio files through a React interface and stores valid files on the Express server for upcoming transcription processing.

## Tech Stack

- Client: React.js, Vite, Tailwind CSS
- Server: Node.js, Express.js, Multer
- Planned: MongoDB, Mongoose, speech-to-text API integration

## Current Features

- Clean product-style upload workspace
- Audio file validation for mp3, wav, and m4a
- Temporary server-side audio storage
- Health-check API for frontend/backend status
- Reusable backend routes, controllers, middleware, and utilities
- Session upload history in the client UI

## Run The App

Start the server:

```bash
cd Server
npm install
npm run dev
```

Start the client:

```bash
cd Client
npm install
npm run dev
```

## API Endpoints

```text
GET  /api/health
POST /api/uploads/audio
```

The upload endpoint expects `multipart/form-data` with the file field named `audio`.
