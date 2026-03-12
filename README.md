

# HRMS Lite – Employee Attendance Management System

**HRMS Lite** is a lightweight Human Resource Management System designed to manage employee records and daily attendance.

The application is built using a modern **full-stack architecture** with a **React frontend**, **FastAPI backend**, and **MongoDB database**, all containerized using **Docker**.

This project demonstrates **full-stack development, REST API design, authentication, database modeling, and containerized deployment.**

---

# 🚀 Tech Stack

## Frontend
- React (Vite)
- Redux Toolkit (State Management)
- Axios (API Requests)
- TailwindCSS (Styling)

## Backend
- FastAPI (High-performance Python framework)
- JWT Authentication (Secure access)
- Passlib (bcrypt) (Password hashing)
- Pydantic (Data validation)

## Database & DevOps
- MongoDB (NoSQL Database)
- Docker & Docker Compose (Containerization)
- Persistent MongoDB volumes (Data safety)

---

# 🏗 System Architecture

```

React Frontend  →  REST API  →  FastAPI Backend  →  MongoDB

```

All services run in **isolated containers** and are orchestrated using **Docker Compose**.

---

# ✨ Features

### Secure Authentication
- JWT-based login
- Password hashing with bcrypt

### Employee Management
- Create employees
- View employee profiles
- Assign roles and departments

### Attendance System
- Daily sign-in
- Daily sign-out
- Attendance history tracking

### Role Based Access

**Admin**
- Manage employees
- View global attendance logs

**Employee**
- View personal profile
- View personal attendance history

---

# 📁 Project Structure

```

HRMS_Attendence
│
├── backend
│   ├── app
│   │   ├── auth/            # JWT & Login logic
│   │   ├── routes/          # Employee & Attendance endpoints
│   │   ├── schemas/         # Pydantic models
│   │   ├── database.py      # MongoDB connection
│   │   └── main.py          # FastAPI entry point
│   │
│   └── requirements.txt
│
├── frontend
│   ├── src/                 # React components & Redux logic
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml       # Docker orchestration
└── README.md

````

---

# 🛠 Running the Project with Docker

## 1. Clone the repository

```bash
git clone https://github.com/shubhamkr007/HRMS_Attendence.git
cd HRMS_Attendence
````

## 2. Start the application

```bash
docker compose up --build
```

---

# 🌐 Service Access

Once the containers are running:

| Service           | URL                                                      |
| ----------------- | -------------------------------------------------------- |
| Frontend          | [http://localhost:5173](http://localhost:5173)           |
| Backend API       | [http://localhost:8000](http://localhost:8000)           |
| API Documentation | [http://localhost:8000/docs](http://localhost:8000/docs) |

---

# 🔑 Default Admin Account

The system automatically creates an admin account on the first run.

```
Email: admin@company.com
Password: admin
```

---

# 📡 API Endpoints Overview

| Category   | Method | Endpoint            | Description         |
| ---------- | ------ | ------------------- | ------------------- |
| Auth       | POST   | /login              | Secure JWT login    |
| Employee   | GET    | /employees          | List all employees  |
| Employee   | POST   | /employees          | Create new employee |
| Attendance | POST   | /attendance/signin  | Log start of day    |
| Attendance | POST   | /attendance/signout | Log end of day      |
| Attendance | GET    | /attendance/{id}    | Attendance history  |

---

# 🗄 Database Collections

### employees

Stores employee profile information, roles, and hashed credentials.

### attendance

Stores daily attendance logs.

A unique index ensures **only one attendance entry per employee per day**.

