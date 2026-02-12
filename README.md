# AI Email Writer - Frontend

A React-based web interface for generating AI-powered email replies.

## 🚀 Tech Stack

- React
- Material UI
- Axios
- Hosted on Netlify

## 🏗 Architecture

User → Netlify (React App)
→ Render (Spring Boot API)
→ Groq AI

## 📂 Project Structure

src/
  ├── App.js
  ├── index.js
  └── components (if any)

## ⚙ Configuration

The backend API URL is currently hardcoded:

https://email-writer-backend-uii5.onrender.com/api/email/generate

## ▶ Running Locally

1. Install dependencies:
   npm install

2. Start dev server:
   npm start

3. Build for production:
   npm run build

Build output directory:
dist (Vite)

## 🌍 Deployment

Hosted on Netlify:
https://email-writer-front.netlify.app/

## 🔮 Future Improvements

- Add authentication
- Add loading state improvements
- Add dark/light theme toggle
- Add email history storage
- Add prompt customization
