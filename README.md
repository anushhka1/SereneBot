# 🤖 SereneBot – Mental Health Chatbot

> An AI-powered mental health support chatbot built using the MERN Stack and Gemini AI.

SereneBot is a web-based application designed to provide users with an accessible and supportive space to express their thoughts and feelings. It combines an AI-powered chatbot with a personal journal to encourage emotional awareness and self-reflection.

---

## ✨ Features

* 🔐 **User Authentication** – Secure login and user verification.
* 💬 **AI Chatbot** – Conversational support powered by Gemini AI.
* 📖 **Personal Journal** – Write, save, and manage personal thoughts and reflections.
* 🏠 **Dashboard** – Centralized interface for accessing application features.
* 🔒 **Privacy-Focused** – Designed with user privacy and secure access in mind.
* 🧠 **Supportive Responses** – Provides empathetic and context-aware responses.
* 📚 **Resource Guidance** – Guides users toward appropriate mental health resources when needed.

---

## 🛠️ Tech Stack

| Category        | Technologies                    |
| --------------- | ------------------------------- |
| Frontend        | React.js, JavaScript, Bootstrap |
| Backend         | Node.js, Express.js             |
| Database        | MongoDB / MongoDB Atlas         |
| AI Integration  | Gemini AI API                   |
| Authentication  | JWT                             |
| API             | REST APIs                       |
| Package Manager | npm                             |
| Tools           | VS Code, Git, GitHub            |

---

## 📂 Project Structure

```text
SereneBot/
│
├── backend/
│   ├── database/
│   │   └── db.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── chatRoutes.js
│   │   └── journalRoutes.js
│   │
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your system:

* [Node.js](https://nodejs.org/)
* npm
* MongoDB or MongoDB Atlas
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/anushhka1/SereneBot.git
cd SereneBot
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install the dependencies:

```bash
npm ci
```

Create a `.env` file inside the `backend` folder:

```env
PORT=3001
Db_url=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:3001
```

### 3. Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install the dependencies:

```bash
npm ci
```

Start the frontend:

```bash
npm run dev
```

The frontend will generally run at:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

The backend requires the following environment variables:

| Variable         | Description                           |
| ---------------- | ------------------------------------- |
| `PORT`           | Port on which the backend server runs |
| `Db_url`         | MongoDB connection string             |
| `JWT_SECRET`     | Secret key used for authentication    |
| `GEMINI_API_KEY` | API key used for Gemini AI            |

> ⚠️ **Never commit your `.env` file or API keys to GitHub.**

Add the following to `.gitignore`:

```text
.env
node_modules/
```

---

## 🧩 Application Modules

### 🔐 Authentication

Handles user registration, login, and authentication to provide secure access to the application.

### 💬 Chatbot

Allows users to interact with SereneBot through a conversational interface. Gemini AI is used to generate supportive and context-aware responses.

### 📖 Personal Journal

Allows users to write, save, and manage personal journal entries for reflection and emotional awareness.

### 🏠 Dashboard

Provides a centralized interface for accessing the chatbot, journal, and other application features.

---

## 🎯 Project Objectives

* Provide accessible emotional support through an AI-powered chatbot.
* Create a comfortable space where users can express their thoughts.
* Allow users to maintain personal journals for self-reflection.
* Provide guidance toward appropriate mental health resources.
* Develop a user-friendly and scalable MERN-based application.

---

## 🌱 Project Scope

SereneBot aims to make basic emotional support more accessible through a web-based platform that can be accessed from anywhere with an internet connection.

The application combines conversational AI and journaling features to support everyday emotional well-being and self-reflection.

---

## ⚠️ Limitations

* AI-generated responses may not always be accurate or appropriate.
* SereneBot is not a replacement for professional mental health care.
* The application requires an internet connection for AI and cloud-based services.
* Users experiencing serious or ongoing mental health concerns should seek support from qualified professionals.

---

## 🔮 Future Enhancements

* 📊 Mood tracking and visualization
* 😊 Emotion and sentiment analysis
* 🔔 Personalized reminders
* 🌐 Multi-language support
* 🎙️ Voice-based interaction
* 📱 Mobile application
* 👨‍⚕️ Integration with professional mental health resources

---

## 👩‍💻 Author

**Anushka Mishra**

MCA (2024–2026)
