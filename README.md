# REST API with Node.js

Welcome to the REST API with Node.js project! This project serves as a boilerplate for setting up a RESTful API using Node.js, Express, and MongoDB. It includes essential features like user authentication, CRUD operations, and error handling, making it a great starting point for your own applications.

## Features

- User Authentication: JWT-based authentication.
- CRUD Operations: Basic CRUD operations for resources.
- Error Handling: Centralized error handling mechanism.
- MongoDB Integration: Using Mongoose for database interactions.
- Environment Variables: Configuration through .env files.
- Security: Basic security practices implemented.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/lostmart/rest-api-Node-js.git
```

2. Navigate to the project directory:

```bash
cd rest-api-Node-js
```

3. Install dependencies:

```
npm install
```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables as specified in the Environment Variables section.

5. Start the development server:

```bash
npm run dev
```

## Usage

### Authentication

- Register: POST /api/auth/register
- Login: POST /api/auth/login

### User

- Get All Items: GET /api/items
- Create New Item: POST /api/items
- Get Item by ID: GET /api/items/:id
- Update Item: PUT /api/items/:id
- Delete Item: DELETE /api/items/:id

## Environment Variables

The following environment variables need to be set in a .env file at the root of the project:

- PORT: The port number on which the server will run (e.g., 3000).
- MONGODB_URI: The URI for connecting to your MongoDB database.
- JWT_SECRET: Secret key for signing JWT tokens.

Example .env file:

```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret
```

## Project Structure

The project structure is as follows:

```bash
rest-api-Node-js/
├── /config
│   └── db.js           # Database connection configuration
├── controllers/        # Controller functions for handling requests
   └── user.js          # User's logic
├── middlewares/        # Custom middleware functions
├── models/             # Mongoose models
├── routes/             # Express routes
├── utils/              # Utility functions
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # NPM package configuration
├── README.md           # Project README file
└── server.js           # Main server file
```

## License

This project is licensed under the MIT License.

Martin
