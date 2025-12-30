Task Management Application
A full-stack task management application built with Spring Boot and React.
📋 Overview
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


🚀 How to Run the Project
Prerequisites
Before running the application, ensure you have the following installed:

Java 17 or higher - Download Java
Node.js 16 or higher - Download Node.js
Maven - Download Maven (or use the included Maven wrapper)
Git - Download Git

Step 1: Clone the Repository
bashgit clone <repository-url>
cd task-management-app
Step 2: Backend Setup

Navigate to the backend directory:

bash   cd backend

Build the project:

bash   ./mvnw clean install
On Windows, use:
bash   mvnw.cmd clean install

Run the Spring Boot application:

bash   ./mvnw spring-boot:run
On Windows, use:
bash   mvnw.cmd spring-boot:run

Verify the backend is running:

The server should start on http://localhost:8080
You should see console output indicating "Started TaskManagementApplication"



Step 3: Frontend Setup

Open a new terminal window/tab (keep the backend running)
Navigate to the frontend directory:

bash   cd frontend

Install dependencies:

bash   npm install

Start the React development server:

bash   npm start

Access the application:

The browser should automatically open to http://localhost:3000
If not, manually navigate to http://localhost:3000



Step 4: Using the Application

Register a new account:

Click on "Register" or navigate to the registration page
Fill in your name, email, and password
Submit the form


Login:

Use your registered email and password to login
You'll receive a JWT token (stored automatically)


Manage tasks:

Create new tasks with title and description
Update task status (Pending → In Progress → Done)
Delete tasks you no longer need
All tasks are private to your account




🔧 Configuration
Backend Configuration
The backend configuration is in backend/src/main/resources/application.properties:
properties# Server port
server.port=8080

# H2 Database (in-memory)
spring.datasource.url=jdbc:h2:mem:taskdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update

# JWT Secret (change in production)
jwt.secret=your-secret-key-here
jwt.expiration=86400000
Frontend Configuration
API endpoint configuration is in frontend/src/services/api.js:
javascriptconst API_URL = 'http://localhost:8080/api';

📡 API Endpoints
Authentication
MethodEndpointDescriptionAuth RequiredPOST/api/registerRegister new userNoPOST/api/loginLogin and receive JWT tokenNo
Register/Login Request Body:
json{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Login Response:
json{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "email": "john@example.com",
  "name": "John Doe"
}

Tasks
MethodEndpointDescriptionAuth RequiredGET/api/tasksGet all tasks for logged-in user✅ YesPOST/api/tasksCreate a new task✅ YesPATCH/api/tasks/{id}/statusUpdate task status✅ YesDELETE/api/tasks/{id}Delete a task✅ Yes
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
Get Tasks Response:
json[
  {
    "id": 1,
    "title": "Complete assessment",
    "description": "Finish the technical assessment",
    "status": "IN_PROGRESS",
    "createdAt": "2025-12-28T10:30:00"
  },
  {
    "id": 2,
    "title": "Review documentation",
    "description": "",
    "status": "PENDING",
    "createdAt": "2025-12-28T11:00:00"
  }
]
Task Status Values:

PENDING - Task is created but not started
IN_PROGRESS - Task is currently being worked on
DONE - Task is completed


🔐 Authentication

JWT (JSON Web Token) based authentication
Token must be included in the Authorization header for protected routes
Format: Authorization: Bearer <token>
Frontend automatically stores and sends JWT token from localStorage


🐛 Troubleshooting
Backend Issues
Port 8080 already in use:
bash# Find and kill the process using port 8080
# Linux/Mac:
lsof -ti:8080 | xargs kill -9
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F
Maven build fails:

Ensure Java 17+ is installed: java -version
Clear Maven cache: ./mvnw clean
Check internet connection (Maven downloads dependencies)

Frontend Issues
Port 3000 already in use:

The app will prompt to use a different port (usually 3001)
Or kill the process: lsof -ti:3000 | xargs kill -9 (Mac/Linux)

npm install fails:

Clear npm cache: npm cache clean --force
Delete node_modules and package-lock.json, then run npm install again
Ensure Node.js 16+ is installed: node -version

Cannot connect to backend:

Verify backend is running on http://localhost:8080
Check CORS configuration in backend
Clear browser cache and localStorage


✅ Features Implemented

✅ User registration with password hashing
✅ User login with JWT token generation
✅ Create, read, update, delete tasks
✅ Task status management (PENDING, IN_PROGRESS, DONE)
✅ User-specific tasks (users can only access their own tasks)
✅ Protected API endpoints
✅ Responsive frontend interface
✅ Loading and error state handling
✅ Form validation


📝 Assumptions

Database: Using H2 in-memory database for simplicity (can be switched to MySQL/PostgreSQL)
JWT Expiration: Tokens expire after 24 hours
Default Status: New tasks default to PENDING status
CORS: Enabled for http://localhost:3000 during development
Password Security: Passwords are hashed using BCrypt
Task Privacy: Users can only view/modify their own tasks
Status Values: Only three valid statuses: PENDING, IN_PROGRESS, DONE


📂 Project Structure
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


📞 Support
If you encounter any issues:

Check the troubleshooting section above
Verify all prerequisites are installed correctly
Ensure both servers are running simultaneously
Check browser console and backend logs for errors
