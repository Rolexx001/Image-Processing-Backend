# 🚀 ImageOrchestrator - Scalable Image Processing Microservice

A high-performance, asynchronous image processing engine built with **Node.js** and **BullMQ**. This service offloads heavy image manipulation tasks to background workers, ensuring a non-blocking and highly responsive API.

---

## 🌟 Key Features

* **Asynchronous Task Processing:** Uses **BullMQ** and **Redis** to handle heavy image jobs without slowing down the main API thread.
* **Intelligent Job Queue:** Redis-based queuing system for reliable task management.
* **Advanced Manipulations (Sharp):** * Fast resizing and multi-format compression.
    * Automatic **WebP/AVIF** conversion for web optimization.
    * Dynamic **Watermark** injection for brand protection.
* **Fault Tolerance:** Automated **Retry Mechanism** with **Exponential Backoff** to handle failed jobs gracefully.
* **Real-time Monitoring:** Integrated **Bull Board** dashboard for visual tracking of active, completed, and failed jobs.
* **Database Tracking:** MongoDB integration for persistent status tracking of every image task.
* **Automated Cleanup:** Smart logic to delete temporary raw files after successful processing.

---

## 🛠️ Tech Stack

* **Backend Framework:** Node.js, Express.js
* **Task Management:** BullMQ (Job Queue), Redis (Message Broker)
* **Image Processing:** Sharp
* **Database:** MongoDB & Mongoose
* **Monitoring:** Bull Board
* **File Handling:** Multer

---


