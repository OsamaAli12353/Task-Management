# Task Management App

A simple task management application with Spring Boot backend and React frontend. Users can register, login, create tasks, update status, and delete tasks.  

---

## Setup Instructions

### Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
Run the application:

bash
Copy code
./mvnw spring-boot:run
The backend will run on http://localhost:8080.

Frontend
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend:

bash
Copy code
npm start
The frontend will run on http://localhost:3000.

How to Run the Project
Start the backend server first.

Start the frontend server.

Open your browser at http://localhost:3000 and interact with the app.

API Endpoints
Method	Endpoint	Description
POST	/api/register	Register a new user
POST	/api/login	Login and retrieve JWT token
GET	/api/tasks	Get all tasks for logged-in user
POST	/api/tasks	Add a new task
PATCH	/api/tasks/{id}/status	Update task status
DELETE	/api/tasks/{id}	Delete a task

Assumptions
JWT token is required for all /api/tasks/** endpoints.

Default task status is PENDING when created.

CORS is enabled for http://localhost:3000.

Frontend stores JWT in localStorage and uses it for authenticated requests.

Notes
Task statuses: PENDING, IN_PROGRESS, DONE.

Frontend uses React and Axios for API requests.

Backend uses Spring Boot, Spring Security, and JWT for authentication.

vbnet
Copy code

I can also **add screenshots and a simple project structure diagram** if you want your README to look professional
