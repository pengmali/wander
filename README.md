# Wander - AI-Powered Travel Planner

<div align="center">
  <img height="200" src="wander.png">
</div>

## 📌 Contents

- [Why Wander?](#why-wander---app-overview)
- [Tech Stack](#tech-stack)
- [APIs Used](#apis)
- [Installation Guide](#installation)
- [Future Development](#future-development)
- [Contributors](#contributors)
- [License](#license)

## 🌍 Why Wander? - App Overview

**Wander** is an AI-powered travel planner that helps users create customized itineraries based on their budget, preferences, and destinations. It integrates with AI services to suggest optimal routes, accommodations, and activities.

### Who is this for?
- Travelers looking for an automated **trip planning assistant**
- Users who want an interactive, **budget-aware** itinerary generator
- People who love **customizable** travel recommendations

<div align="center">
  <img height="400px" src="Wander Landing Page.png">
</div>

## 💻 Tech Stack
- **React** - Frontend UI framework 
- **Tailwind CSS** - Styling framework
- **Ruby on Rails** - Backend web framework
- **PostgreSQL** - Database
- **Redis** - Caching & job processing (Sidekiq)
- **Heroku** - Hosting

## 🔗 APIs Used
- **Google Maps API** - Interactive trip visualization
- **OpenAI API** - AI-generated itinerary suggestions
- **Auth0** - User authentication


## 🚀 Installation Guide

### **Prerequisites**
Ensure you have the following installed:
- **Docker** (for PostgreSQL & Redis)
- **Node.js (v16+)**
- **Ruby 3.x & Rails 7**

### **Setup Steps**
```sh
# Clone the repository
git clone https://github.com/pengmali/wander.git
cd wander

# Setup Backend
cd backend
cp .env.example .env
docker-compose up -d  # Start PostgreSQL & Redis
bundle install
rails db:setup
rails server

# Setup Frontend
cd ../frontend
npm install
npm start
```
Access the app at `http://localhost:3000`


## 🔮 Future Development
- Add **live pricing updates** for flights and hotels
- Implement **real-time collaborative trip planning**
- Develop **a mobile app** version

## ✨ Contributors
- **[Your Name](https://github.com/yourgithub)**

## 📜 License
MIT License
