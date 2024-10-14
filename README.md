# REST API with Node.js

Welcome to the REST API with Node.js project! This project serves as a boilerplate for setting up a RESTful API using Node.js, Express, and MongoDB. It includes essential features like user authentication, CRUD operations, and error handling, making it a great starting point for your own applications.

## Features

- User Authentication: JWT-based authentication.
- CRUD Operations: Basic CRUD operations for resources.
- Error Handling: Centralized error handling mechanism.
- MongoDB Integration: Using Mongoose for database interactions.
- Environment Variables: Configuration through .env files.
- Security: Basic security practices implemented.
- Unit testing with Jest and HTTP testing with Supertest

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
├── tests/              # Jest and Supertest for testing HTTP requests
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # NPM package configuration
├── README.md           # Project README file
└── server.js           # Main server file
```

## Jest and Supertests added for unit testing and HTTP testing

Jest extra config config with babel: Jest doesn't like very much ES modules in JavaScript sop it requires some fiddling with babe configurations as well as jest config as well. To sort this out I added a `jest.config.js` file with the following code:

```javascript
module.exports = {
	transform: {
		"^.+\\.js$": "babel-jest",
	},
	moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
	transformIgnorePatterns: ["/node_modules/(?!(your-esm-dependency)/)"],
	testEnvironment: "node",
}
```

Since I am using ES module syntax, Jest will need Babel to transform the code. I installed `babel-jest` and `@babel/preset-env` as dev dependencies and in the `babel.config.js` file I added

```javascript
{
  "presets": ["@babel/preset-env"]
}
```

In the `package.json` file I updated my scripts as follows:

```json
"test": "cross-env NODE_OPTIONS='--experimental-vm-modules' npx jest"
```

This allows me to run the command `npm run test` on my terminal in order to launch all the tests

## License

This project is licensed under the MIT License.

Martin
