# 🤖 SereneBot – Mental Health Chatbot

> An AI-powered mental health support chatbot built using the MERN Stack and Gemini AI.

SereneBot is a web-based mental health support application designed to provide users with an accessible and supportive space to express their thoughts and feelings. The application combines an AI-powered chatbot with a personal journal to encourage emotional awareness and self-reflection.

---

## ✨ Features

- 🔐 **User Authentication** – Secure user login and verification.
- 💬 **AI Chatbot** – Conversational support powered by Gemini AI.
- 📖 **Personal Journal** – Write, save, and manage personal thoughts and reflections.
- 🏠 **Dashboard** – Simple and centralized navigation.
- 🔒 **Privacy-Focused** – Designed to provide a comfortable and private environment.
- 🧠 **Empathetic Responses** – Provides supportive responses during conversations.
- 📚 **Resource Guidance** – Helps direct users toward appropriate mental health resources when required.

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React.js, JavaScript, Bootstrap |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| AI Integration | Gemini AI API |
| Authentication | JWT |
| API | REST APIs |
| Package Manager | npm |
| Tools | VS Code, Git, GitHub |

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
🚀 Getting Started
Prerequisites

Make sure the following are installed on your system:

Node.js
npm
MongoDB / MongoDB Atlas
Git
1. Clone the Repository
git clone https://github.com/anushhka1/SereneBot.git
cd SereneBot
2. Backend Setup

Navigate to the backend folder:

cd backend

Install dependencies:

npm ci

Create a .env file inside the backend folder:

PORT=3001
Db_url=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

Start the backend server:

npm run dev

The backend will run on:

http://localhost:3001
3. Frontend Setup

Open a new terminal and navigate to the frontend:

cd frontend

Install dependencies:

npm ci

Start the frontend:

npm run dev

The frontend will generally run on:

http://localhost:5173
🔑 Environment Variables

The following environment variables are required for the backend:

Variable	Description
PORT	Port on which the backend server runs
Db_url	MongoDB connection string
JWT_SECRET	Secret key used for authentication
GEMINI_API_KEY	API key for Gemini AI

⚠️ Never commit your .env file or API keys to GitHub.

Add this to .gitignore:

.env
node_modules/
🧩 Application Modules
🔐 Authentication

Handles user login and verification to provide authenticated access to the application.

💬 Chatbot

Users can interact with SereneBot through a conversational interface. Gemini AI is used to generate supportive and context-aware responses.

📖 Personal Journal

Users can maintain a personal journal to record thoughts, feelings, and daily reflections.

🏠 Dashboard

Provides a central interface for accessing the chatbot and journal features.

🎯 Project Objectives
Provide accessible emotional support through an AI-powered chatbot.
Create a comfortable space where users can express their thoughts.
Allow users to maintain personal journals for self-reflection.
Provide guidance toward appropriate mental health resources.
Develop a user-friendly and scalable MERN-based application.
🌱 Project Scope

SereneBot aims to make basic emotional support more accessible by providing a web-based platform that users can access from anywhere with an internet connection.

The application combines conversational AI and journaling features to support everyday emotional well-being and self-reflection.

⚠️ Limitations
AI-generated responses may not always be accurate or appropriate.
SereneBot is not a replacement for professional mental health care.
The application requires an internet connection for AI and cloud-based services.
Users experiencing serious or ongoing mental health concerns should seek support from qualified professionals.
🔮 Future Enhancements
📊 Mood tracking and visualization.
😊 Emotion and sentiment analysis.
🔔 Personalized reminders.
🌐 Multi-language support.
🎙️ Voice-based interaction.
📱 Mobile application.
👨‍⚕️ Integration with professional mental health resources.
🖥️ Hardware & Software Requirements
Software
Windows 10/11
Node.js
npm
MongoDB / MongoDB Atlas
Google Chrome / Mozilla Firefox
Visual Studio Code
Git & GitHub
Hardware
Intel Core i3 / AMD Ryzen 3 or above
Minimum 4 GB RAM
512 GB SSD or equivalent storage
Stable internet connection
👩‍💻 Author

Anushka Mishra

MCA (2024–26)
