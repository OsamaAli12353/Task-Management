This application allows users to:

Register and login with secure authentication
Create, view, update, and delete personal tasks
Track task status (Pending, In Progress, Done)
Manage tasks with a clean, responsive interface


🛠️ Tech Stack
Backend:

Spring Boot
Spring Security + JWT Authentication
JPA/Hibernate
H2/MySQL Database

Frontend:

React
Axios for API calls
React Router for navigation
CSS for styling


🚀 Setup Instructions
Prerequisites

Java 17+
Node.js 16+
Maven

Backend Setup
bashcd backend
./mvnw clean install
./mvnw spring-boot:run
The backend server will start on http://localhost:8080
Frontend Setup
bashcd frontend
npm install
npm start
The frontend application will start on http://localhost:3000

📡 API Endpoints
Authentication
MethodEndpointDescriptionAuth RequiredPOST/api/registerRegister new userNoPOST/api/loginLogin and receive JWT tokenNo
Register/Login Request Body:
json{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Tasks
MethodEndpointDescriptionAuth RequiredGET/api/tasksGet all tasks for logged-in userYesPOST/api/tasksCreate a new taskYesPATCH/api/tasks/{id}/statusUpdate task statusYesDELETE/api/tasks/{id}Delete a taskYes
Create Task Request Body:
json{
  "title": "Complete assessment",
  "description": "Finish the technical assessment",
  "status": "PENDING"
}
Update Status Request Body:
json{
  "status": "IN_PROGRESS"
}
```

---

## 🔐 Authentication

- JWT (JSON Web Token) based authentication
- Token must be included in the `Authorization` header for protected routes
- Format: `Authorization: Bearer <token>`
- Frontend automatically stores and sends JWT token from localStorage

---

## ✅ Features Implemented

- ✅ User registration with password hashing
- ✅ User login with JWT token generation
- ✅ Create, read, update, delete tasks
- ✅ Task status management (PENDING, IN_PROGRESS, DONE)
- ✅ User-specific tasks (users can only access their own tasks)
- ✅ Protected API endpoints
- ✅ Responsive frontend interface
- ✅ Loading and error state handling
- ✅ Form validation

---

## 📝 Assumptions

1. **Database:** Using H2 in-memory database for simplicity (can be switched to MySQL/PostgreSQL)
2. **JWT Expiration:** Tokens expire after 24 hours
3. **Default Status:** New tasks default to `PENDING` status
4. **CORS:** Enabled for `http://localhost:3000` during development
5. **Password Security:** Passwords are hashed using BCrypt
6. **Task Privacy:** Users can only view/modify their own tasks
7. **Status Values:** Only three valid statuses: `PENDING`, `IN_PROGRESS`, `DONE`

---

## 📂 Project Structure
```
task-management-app/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/taskmanager/
│   │   │   │       ├── controller/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       ├── service/
│   │   │   │       └── security/
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md

🧪 Testing
Manual Testing Steps:

Start both backend and frontend servers
Navigate to http://localhost:3000
Register a new user
Login with created credentials
Create several tasks
Update task statuses
Delete tasks
Logout and login again to verify persistence


🚧 Known Limitations

No pagination implemented (would be added for large task lists)
No task filtering or search functionality
Basic UI styling (focus on functionality over design)
No automated tests (time constraint)
Using in-memory database (data clears on restart)


🔄 Future Improvements

Add task due dates and priorities
Implement task categories/tags
Add pagination and filtering
Deploy to cloud platform
Add automated tests
Implement task sharing between users
Add email notifications
