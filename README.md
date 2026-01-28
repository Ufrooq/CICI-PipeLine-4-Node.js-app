# Backend API

A Node.js/Express backend API for the Jira clone application with MongoDB integration.

## Prerequisites

1. **Install MongoDB:**
   - Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Or use MongoDB Atlas (cloud) for easier setup

2. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   mongod
   ```

## Installation

```bash
pnpm install
pnpm add mongoose
```

## Environment Variables

Create a `.env` file in the root directory:

```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
MONGODB_URI=mongodb://localhost:27017/jira-app
```

For MongoDB Atlas (cloud):

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jira-app?retryWrites=true&w=majority
```

## Running the Server

```bash
pnpm start
```

The server will run on http://localhost:3000

## API Endpoints

### Authentication

#### Register User

- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Login User

- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Get User Profile

- **GET** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`

## Database Schema

### User Collection

- `name`: String (required)
- `email`: String (required, unique, lowercase)
- `password`: String (required, hashed with bcrypt)
- `createdAt`: Date (default: current timestamp)

## Response Format

All responses follow this format:

```json
{
  "message": "Success message",
  "user": { ... },
  "token": "jwt-token"
}
```

## Error Handling

Errors return appropriate HTTP status codes with error messages:

```json
{
  "message": "Error description"
}
```
