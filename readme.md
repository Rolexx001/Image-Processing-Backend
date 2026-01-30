# Image Processing Backend
A Node.js backend project for asynchronous image processing using
Express, MongoDB, Redis, BullMQ, and Sharp.

---

## Features
- Image upload using Multer
- Background processing with BullMQ
- Redis-based job queue
- Image resizing and compression
- WebP conversion
- Watermark support
- MongoDB status tracking
- Retry with exponential backoff
- Bull Board dashboard

---

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Redis
- BullMQ
- Sharp
- Multer

---

## How it works

1. User uploads image
2. Image stored temporarily
3. Job added to Redis queue
4. Worker processes image
5. Image resized and optimized
6. MongoDB updated with status
7. Original image deleted

---


