# Image Processing Backend (Orchestrator)

A highly scalable, decoupled backend service designed to handle resource-intensive image processing tasks asynchronously. By utilizing an event-driven producer-consumer architecture, this system offloads heavy computational workloads from the main API thread, ensuring zero-blocking performance and high API responsiveness.

## 🏗️ Architecture Overview

The system is split into two primary components to maintain high availability and horizontal scalability:
1. **Express API Server (Producer):** Validates incoming payload data, manages database records in MongoDB via Mongoose, and enqueues tasks instantly.
2. **Background Worker (Consumer):** An isolated processor powered by **BullMQ** and **Redis** that handles heavy image operations, retries on failures, and updates task states.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose ORM
- **Task Orchestration:** Redis & BullMQ
- **Environment Management:** Dotenv

## ✨ Key Features
- **Decoupled Architecture:** Separates API request handling from heavy background computations.
- **Resilient Job Queueing:** Built-in automatic retries, concurrency limits, and exponential backoff configuration via BullMQ.
- **Asynchronous Processing:** Multi-stage image tasks run fully non-blocking to prevent Node.js event-loop starvation.
- **State Management:** Strict data persistence layer tracking `Pending`, `Processing`, `Completed`, and `Failed` job states.
