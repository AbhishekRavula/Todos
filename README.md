# Todo App

This is a Todo application developed using React.js and Express.js, following the principles of Test-Driven Development (TDD).

## Introduction

The Todo App is a web application that allows users to manage their tasks and keep track of their to-do lists. The frontend of the application is built with React.js. The backend is developed using Express.js, providing RESTful APIs to handle the CRUD operations of tasks.

The development of this application follows the principles of Test-Driven Development (TDD), ensuring a robust and reliable codebase with comprehensive test coverage.

## Installation

To install and set up the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the `client` directory and `server` directory.
3. Install the dependencies on both directories by running the following command:
```
npm install
```

## Environment Variables

This project requires the use of environment variables for configuration. Before running the application, you need to set up a .env file in the project's client directory and server directory.

`client` directory `.env` file should include the following variable:

``VITE_API_URL``: Provide the backend URL for server requests. This variable should store the base URL of your backend server or API endpoint. For example:

```VITE_API_URL=http://localhost:5000```

<br>

`server` directory `.env` file should include the following variable:

``PORT``: Specify the port number on which the application will run. If not defined, the application will default to port `5005`. For example:

```PORT=5000```



## Running the Application

To start the Todo App, follow these steps:

1. Ensure that the backend server is running. Navigate to the server directory and run the following command:
   
   ```npm run dev```

3. Open a new terminal window, navigate to client directory, and run the following command:
   
   ```npm run dev```

The frontend development server will start, and the Todo App will be accessible in your web browser.

## Running Tests

The Todo App includes comprehensive tests to ensure its functionality and reliability. To run the tests, follow these steps:

1. Open a terminal window and navigate to either of `server` or `client` directory.
2. Run the following command to execute the tests:
   ```npm run test```
3. To execute tests with coverage report:
   ```npm run coverage```



