# Authentication System API

This is a Node.js-based Authentication System API built with Express, Drizzle, and JWT (JSON Web Tokens). The API provides endpoints for user authentication, user management, group management, and access control policies. Below is a detailed guide on how to set up, use, and understand the API.

---

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [API Endpoints](#api-endpoints)
5. [Authentication](#authentication)
6. [Database Seeding](#database-seeding)
7. [Environment Variables](#environment-variables)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features
- User registration, login, and logout.
- Password reset functionality.
- User management (CRUD operations).
- Group management (CRUD operations).
- Access control policies (CRUD operations).
- JWT-based authentication for secure endpoints.
- Database seeding for initial setup.

---

## Technologies Used
- **Node.js**: Runtime environment.
- **Express**: Web framework for building the API.
- **Drizzle**: Database ORM for managing database interactions.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **PostgreSQL**: Database used for storing user, group, and policy data.
- **Bcrypt**: For password hashing and verification.
- **Dotenv**: For managing environment variables.

---

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/) / [MySQL](https://www.mysql.com/) / [SQLite](https://sqlite.org/)

**Clone the repository**:
   ```bash
   git clone https://github.com/your-repo/authentication-system-api.git
   cd authentication-system-api
   ```

**Install dependencies**:
   ```bash
   npm install
   ```
**Configure Environment Variables**:
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
DATABASE_URL="your-database-url"
JWT_SECRET="your-secret-key"
```


**Set up the database**:
   - Ensure PostgreSQL is installed and running.
   - Create a new database for the project.
   - Update the database connection details in the `.env` file (see [Environment Variables](#environment-variables)).

4. **Run migrations**:
   ```bash
   npm run migrate
   ```

5. **Start the server**:
   ```bash
   npm start
   ```

6. **Seed the database (optional)**:
   ```bash
   npm run seed
   ```

---
## API Endpoints

### Authentication Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/register` | Register a new user |
| POST | `/login/` | Login a user and get a JWT token |
| POST | `/logout` | Logout a user |
| POST | `/reset-password` | Reset user password |

### User Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/` | Get all users |
| GET | `/{id}` | Get a specific user by ID |
| PUT | `/{id}` | Update user details |
| DELETE | `/{id}` | Delete a user |

### Group Routes
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/groups/` | Get all groups |
| GET | `/groups/:id` | Get a specific group by ID |
| POST | `/groups/` | Create a new group |
| PUT | `/groups/:id` | Update a group |
| DELETE | `/groups/:id` | Delete a group |

### Access Policies
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/access/list` | Get access list |
| GET | `/policies/` | Get all policies |
| GET | `/policies/:id` | Get a specific policy by ID |
| POST | `/policies/` | Create a new policy |
| PUT | `/policies/:id` | Update a policy |
| DELETE | `/policies/:id` | Delete a policy |

### Database Operations
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/seeding` | Seed the database |

---

## Authentication & Authorization
- The API uses **JWT tokens** for authentication.
- Protected routes require an **Authorization** header with a valid JWT token.
- Users are authenticated via email and password.
- Passwords are **hashed** using **bcrypt** before storing in the database.

### Example: How to Use JWT Token
#### Login Request
```sh
curl -X POST http://localhost:5000/login/ -H "Content-Type: application/json" -d '{"email": "user@example.com", "password": "yourpassword"}'
```
#### Response
```json
{
  "token": "your-jwt-token"
}
```
#### Accessing Protected Route
```sh
curl -X GET http://localhost:5000/protected-route -H "Authorization: Bearer your-jwt-token"
```

---

## Contribution
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your fork.
5. Create a pull request.

---


## Authentication

The API uses JWT for authentication. After a successful login, a JWT token is returned, which must be included in the `Authorization` header for protected routes.

Example:
```http
Authorization: Bearer <JWT_TOKEN>
```

---

## Database Seeding

To populate the database with initial data (e.g., users, groups, policies), you can use the `/seeding` endpoint. This is useful for testing and development purposes.

---


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

For any questions or issues, please open an issue on the GitHub repository.
EOT

## Contact
For any questions or issues, reach out via:
- GitHub: [yourusername](https://github.com/yourusername)

---