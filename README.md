# Employee Management System

This project is a full-stack Employee Management System built with React.js for the front-end and Node.js with Express for the back-end.

## Features

- User authentication
- Employee listing with DataTables
- Create, Read, Update, and Delete (CRUD) operations for employees
- Image upload for employee profiles
    
## Tech Stack

### Front-end
- React.js
- React Router for navigation
- Axios for API requests
- Bootstrap for styling
- DataTables for employee listing

### Back-end
- Node.js
- Express.js
- MongoDB for database
- Multer for file uploads


## Setup and Installation

1. Clone the repository
2. Install dependencies for both front-end and back-end
3. Set up MongoDB and update connection string
4. Start the back-end server
5. Start the front-end development server

## API Endpoints

- GET /employee/get - Fetch all employees
- GET /employee/get/:id - Fetch a single employee
- POST /employee/create - Create a new employee
- PUT /employee/update/:id - Update an employee
- DELETE /employee/delete/:id - Delete an employee

## Front-end Routes

- /login - User login
- /dashboard - Main dashboard
- /employee-list - List all employees
- /create-employee - Create a new employee
- /edit-employee/:id - Edit an existing employee

## Key Components

### Back-end
- Employee.js: Handles all employee-related API routes
- Login.js: Handles user login
- server.js: Main server file

### Front-end
- EmployeeList.js: Displays all employees using DataTables
- CreateEmployee.js: Form for creating a new employee
- EmployeeEdit.js: Form for editing an existing employee
- Header.js: Navigation component
- LandingPage.js: Landing page
- Dashboard.js: Main dashboard


## File Upload

Employee profile pictures are uploaded and stored in the `/media` directory on the server.

## Future Improvements

- Add user roles and permissions
- Add more detailed employee information
- Improve error handling and user feedback


