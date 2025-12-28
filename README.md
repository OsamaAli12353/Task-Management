Task Management App

A simple task management app with Spring Boot backend and React frontend. Users can register, login, create tasks, update status, and delete tasks.

Setup Instructions:
Backend: cd backend → ./mvnw spring-boot:run (runs on http://localhost:8080
)
Frontend: cd frontend → npm install → npm start (runs on http://localhost:3000
)

How to Run:

Start backend server.

Start frontend server.

Open http://localhost:3000
 in your browser.

API Endpoints:

POST /api/register → Register a new user

POST /api/login → Login and get JWT token

GET /api/tasks → Get all tasks for logged-in user

POST /api/tasks → Add a new task

PATCH /api/tasks/{id}/status → Update task status

DELETE /api/tasks/{id} → Delete a task

Assumptions:

JWT token required for all /api/tasks/** endpoints.

Default task status is PENDING.

CORS enabled for http://localhost:3000
.

Frontend stores JWT in localStorage for authenticated requests.

Notes:

Task statuses: PENDING, IN_PROGRESS, DONE.

Frontend uses React and Axios.

Backend uses Spring Boot, Spring Security, JWT.
