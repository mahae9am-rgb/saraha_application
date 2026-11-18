# 🚀 Saraha Application (Backend)

A secure, anonymous-messaging backend API built with **Node.js**, **Express**, **MongoDB**, and **Redis**.

---

## 🛠️ Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose
* **Caching & Storage:** Redis (for OTP & Refresh Tokens)
* **Authentication:** JWT (Access & Refresh Tokens with Rotation)
* **Security & Validation:** Zod, Rate Limiting, Helmet, Bcrypt
* **Email Service:** Nodemailer (Mailjet)

---

## ✨ Features
* **Complete Auth Flow:** Register, Email OTP Verification, Secure Login, and 2-Step Login.
* **Token Management:** Access & Refresh tokens with rotation and secure logout invalidation.
* **Redis Integration:** Fast OTP generation/verification and token tracking with TTL.
* **Security Measures:** Rate limiting and account lockout after repeated failed login attempts.
* **Messaging System:** Message requests system that leads to active conversations upon approval.
* **Architecture:** Clean **Package-by-Feature** modular architecture.

---

## ⚙️ Getting Started

### Prerequisites
* Node.js installed on your machine
* MongoDB running locally or via MongoDB Atlas
* Redis server running


## Installation & Setup

Clone the repository:
git clone https://github.com/mahae9am-rgb/saraha_application.git

cd saraha_application

Install dependencies:
npm install