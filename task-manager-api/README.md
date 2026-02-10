# Task Manager API

A full-stack task management application built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**. Manage your personal tasks with a clean REST API backend and responsive frontend.

## Features

- **User Authentication**: Register and login with secure JWT tokens.
- **Task Management**: Create, read, update, and delete tasks.
- **User Profiles**: Manage user profile information.
- **Password Security**: Bcrypt hashing for password protection.
- **Token-based Authorization**: Protected endpoints using JWT middleware.
- **Modern Frontend**: Responsive HTML/CSS/JS interface with gradient design.
- **Error Handling**: Global error middleware with meaningful error messages.

## Project Structure

```
task-manager-api/
├── config/
│   └── db.js                    # MongoDB connection configuration
├── controllers/
│   ├── authController.js        # Authentication logic (register, login)
│   ├── taskController.js        # Task CRUD operations
├── middleware/
│   ├── authMiddleware.js        # JWT token verification
│   ├── errorMiddleware.js       # Global error handling
│   └── validationMiddleware.js  # Input validation
├── models/
│   ├── User.js                  # User schema
│   └── Task.js                  # Task schema
├── routes/
│   ├── authRoutes.js            # Auth endpoints
│   ├── taskRoutes.js            # Task endpoints
│   └── userRoutes.js            # User endpoints
├── public/
│   ├── index.html               # Home page
│   ├── login.html               # Login page
│   ├── register.html            # Registration page
│   ├── dashboard.html           # Task dashboard
│   ├── style.css                # Global styles
│   └── script.js                # Frontend logic
├── server.js                    # Express server entry point
├── package.json                 # Dependencies
├── .env                         # Environment variables (not tracked)
└── .env.example                 # Example environment variables
```

## Installation & Setup

### Prerequisites
- **Node.js** (v14+)
- **npm** or **yarn**
- **MongoDB** (local or Atlas cloud)
- **MongoDB connection string** (MONGO_URI)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`)
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_super_secret_key_here
   ```

5. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

6. **Run the server**
   ```bash
   npm start
   ```

7. **Open in browser**
   ```
   http://localhost:5000/
   ```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints (Public)

#### **Register User**
- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "username": "samima",
    "email": "samima@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (201)**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```
- **Error (400)**:
  ```json
  {
    "message": "Email already exists" | "Validation failed"
  }
  ```

#### **Login User**
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "samima@example.com",
    "password": "securepassword123"
  }
  ```
- **Response (200)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Error (401)**:
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

### User Endpoints (Private - Requires JWT Token)

#### **Get User Profile**
- **Method**: `GET`
- **Endpoint**: `/users/profile`
- **Access**: Private (Bearer Token Required)
- **Headers**:
  ```
  Authorization: Bearer <your_jwt_token>
  ```
- **Response (200)**:
  ```json
  {
    "_id": "507f1f77bcf86cd799439011",
    "username": "samima",
    "email": "samima@example.com",
    "createdAt": "2026-02-08T10:30:00.000Z",
    "updatedAt": "2026-02-08T10:30:00.000Z"
  }
  ```

#### **Update User Profile**
- **Method**: `PUT`
- **Endpoint**: `/users/profile`
- **Access**: Private (Bearer Token Required)
- **Request Body**:
  ```json
  {
    "username": "samima_new",
    "email": "newemail@example.com"
  }
  ```
- **Response (200)**:
  ```json
  {
    "_id": "507f1f77bcf86cd799439011",
    "username": "samima_new",
    "email": "newemail@example.com"
  }
  ```

### Task Endpoints (Private - Requires JWT Token)

#### **Create Task**
- **Method**: `POST`
- **Endpoint**: `/tasks`
- **Access**: Private (Bearer Token Required)
- **Request Body**:
  ```json
  {
    "title": "Complete project",
    "description": "Finish the task manager API",
    "status": "pending",
    "dueDate": "2026-02-28"
  }
  ```
- **Response (201)**:
  ```json
  {
    "_id": "507f1f77bcf86cd799439012",
    "user": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the task manager API",
    "status": "pending",
    "dueDate": "2026-02-28",
    "createdAt": "2026-02-08T10:30:00.000Z",
    "updatedAt": "2026-02-08T10:30:00.000Z"
  }
  ```

#### **Get All Tasks**
- **Method**: `GET`
- **Endpoint**: `/tasks`
- **Access**: Private (Bearer Token Required)
- **Response (200)**:
  ```json
  [
    {
      "_id": "507f1f77bcf86cd799439012",
      "user": "507f1f77bcf86cd799439011",
      "title": "Complete project",
      "description": "Finish the task manager API",
      "status": "pending",
      "dueDate": "2026-02-28"
    }
  ]
  ```

#### **Get Single Task**
- **Method**: `GET`
- **Endpoint**: `/tasks/:id`
- **Access**: Private (Bearer Token Required)
- **Response (200)**:
  ```json
  {
    "_id": "507f1f77bcf86cd799439012",
    "user": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the task manager API",
    "status": "pending"
  }
  ```

#### **Update Task**
- **Method**: `PUT`
- **Endpoint**: `/tasks/:id`
- **Access**: Private (Bearer Token Required)
- **Request Body**:
  ```json
  {
    "title": "Updated title",
    "status": "completed"
  }
  ```
- **Response (200)**:
  ```json
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Updated title",
    "status": "completed"
  }
  ```

#### **Delete Task**
- **Method**: `DELETE`
- **Endpoint**: `/tasks/:id`
- **Access**: Private (Bearer Token Required)
- **Response (200)**:
  ```json
  {
    "message": "Task deleted"
  }
  ```

## Testing with Postman

### Import Collection
1. Open **Postman**.
2. Set **Base URL** in environment: `http://localhost:5000/api`
3. Test endpoints:
   - **POST** `/auth/register` — Create account.
   - **POST** `/auth/login` — Get JWT token.
   - **GET** `/users/profile` — Pass token in `Authorization: Bearer <token>`.
   - **POST** `/tasks` — Create tasks (requires token).
   - **GET** `/tasks` — List all tasks.
   - **PUT** `/tasks/:id` — Update task.
   - **DELETE** `/tasks/:id` — Delete task.

## Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key_change_this
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Middleware**: Custom JWT verification, error handling, input validation

## Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Protected API endpoints with middleware
- ✅ Input validation
- ✅ Global error handling
- ✅ Environment variables for sensitive data

## Deployment

### Deploy to Render

1. **Push code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Render account** at [render.com](https://render.com)

3. **New Web Service**:
   - Connect your GitHub repository
   - Set **Build Command** (if needed): `npm install`
   - Set **Start Command**: `npm start`
   - Add environment variables:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your secret key
     - `PORT`: 5000

4. **Deploy** — Render will automatically build and deploy your app.

### Deploy to Railway

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and deploy**:
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Set environment variables** in Railway dashboard.

## Future Enhancements

- [ ] Email verification on signup
- [ ] Password reset functionality
- [ ] Task categories and tags
- [ ] Task reminders and notifications
- [ ] Collaborative tasks (share with others)
- [ ] Rich text editor for task descriptions
- [ ] Task filtering and search
- [ ] Dark/light mode toggle

## License

This project is open-source and available under the MIT License.

## Support

For issues or questions, contact the development team or open an issue on GitHub.

---

**Version**: 1.0.0  
**Last Updated**: February 8, 2026
