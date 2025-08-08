# Meeting Room Booking System

A modern meeting room booking system built with Node.js backend and React frontend, featuring user authentication, room management, and role-based access control.

## Features

- **User Authentication**: Sign up, sign in, and secure token-based authentication
- **Room Management**: Create, edit, and delete meeting rooms
- **Role-Based Access Control**: Admin and User roles for room management
- **Room Sharing**: Add users to rooms with different permission levels
- **Responsive UI**: Modern, responsive interface built with React and Tailwind CSS
- **Real-time Updates**: Dynamic room status and availability updates

## Tech Stack

### Backend

- **Node.js** with TypeScript
- **Express.js** framework
- **Sequelize** ORM with SQLite database
- **JWT** for authentication
- **Joi** for validation

### Frontend

- **React** with TypeScript
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Vite** for build tooling

## Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Git** for cloning the repository

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd test-task-2
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

The backend will start on **http://localhost:3000**

### 3. Frontend Setup

Open a new terminal window and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on **http://localhost:5173** (or another port if 5173 is busy)

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api

## API Endpoints

### Authentication

- `POST /api/auth/sign-up` - Register a new user
- `POST /api/auth/sign-in` - Sign in user
- `POST /api/auth/refresh` - Refresh access token

### Rooms

- `GET /api/rooms` - Get user's accessible rooms
- `POST /api/rooms` - Create a new room
- `GET /api/rooms/:id` - Get room details
- `PUT /api/rooms/:id` - Update room
- `DELETE /api/rooms/:id` - Delete room

### Room Users

- `GET /api/rooms/:roomId/users` - Get room users
- `POST /api/rooms/:roomId/users` - Add user to room
- `DELETE /api/rooms/:roomId/users/:userId` - Remove user from room

### User Management

- `GET /api/users/me` - Get current user info
- `GET /api/users/me/rooms` - Get user's owned room

## Database Schema

The application uses SQLite with the following main tables:

- **users** - User accounts and authentication
- **rooms** - Meeting room information
- **room_users** - Many-to-many relationship between users and rooms with roles
- **tokens** - JWT token storage for authentication

## User Roles

- **Admin**: Can manage room settings, add/remove users, and control room access
- **User**: Can view and participate in rooms they've been added to

## Development

### Project Structure

```
test-task-2/
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── models/         # Database models
│   │   ├── repositories/   # Data access layer
│   │   ├── validators/     # Input validation
│   │   └── middlewares/    # Express middlewares
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store
│   │   ├── hooks/          # Custom hooks
│   │   └── interfaces/     # TypeScript interfaces
│   └── package.json
```

### Available Scripts

#### Backend

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

#### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Troubleshooting

### Common Issues

1. **Port Already in Use**

   - Backend: Change port in `backend/src/configs/env.config.ts`
   - Frontend: Vite will automatically use the next available port

2. **Database Issues**

   - Delete `backend/database.sqlite` and restart backend
   - Database will be recreated automatically

3. **Node Modules Issues**

   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

4. **Frontend Not Connecting to Backend**
   - Check that backend is running on port 3000
   - Check browser console for CORS errors
   - Verify API URL in frontend configuration

### Getting Help

If you encounter issues:

1. Check that both backend and frontend are running
2. Check browser console for errors
3. Check terminal output for error messages
4. Ensure you're using Node.js version 18 or higher

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
