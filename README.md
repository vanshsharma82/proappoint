📌 Online Appointment Booking System

A full-stack MERN project that allows users to book appointments with professionals based on availability.
The system includes authentication, professional listings, slot availability, and booking functionality.

🚀 Tech Stack
Frontend

React (Vite)

React Router

Axios

CSS

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Bcrypt Password Hashing

🔐 User Features
✔ Signup / Login

User registration with name, email, password

Secure login with JWT

Password encryption using bcrypt

Token stored in localStorage

🏠 Home Page

Displays welcome message

Button → Start Appointment

📋 Dashboard

Shows list of all professionals:

Name

Specialization

Description

Buttons:

View Slots

Book Appointment (coming soon)

🧑‍⚕️ Professionals

Seeded sample professionals include:

Dr. Aman Kumar (Dentist)

Dr. Priya Sharma (Dermatologist)

Dr. Rahul Verma (Pediatrician)

Dr. Neha Gupta (Physiotherapist)

Professionals are fetched from backend through API:

GET /professionals

⏰ Slots System (In Progress)

Each professional will have:

Available dates

Time slots (Morning / Afternoon / Evening)

Ability to book a slot

Status (Booked / Available)

API routes:

GET /slots/:professionalId/:date
POST /slots
POST /slots/book

🛠 Backend Setup
Install dependencies
cd Backend
npm install

Run backend
nodemon server.js

🎨 Frontend Setup
Install dependencies
cd Frontend/ointment-booking-frontend
npm install

Run frontend
npm run dev

🌱 Seed Data
Seed professionals
node seed.js

Seed slots (optional)
node seedSlots.js

📌 Project Structure
Backend/
  models/
  routes/
  seed.js
  server.js

Frontend/
  ointment-booking-frontend/
    src/
      pages/
      components/
      App.jsx
      main.jsx

🎯 Work In Progress

Booking history

Professional dashboard

Better UI styling

Calendar UI

Admin panel

✨ Author

Manveer Singh

// addings things later like professionals personal dashboard or other features
.......
