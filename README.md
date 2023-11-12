# Library Management System

![Library Image](https://res.cloudinary.com/dqnbdaara/image/upload/v1699819738/Screenshot_2023-11-12_200751_bqybmx.png)

## Requirements

The Library Management System offers a robust set of features to enhance user experience and library management:

- **Basic Authentication**: Users have the ability to register for an account, and can log in and log out of the system.
- **Book Listing**: The application lists all books in the database, complete with images (if available), titles, and descriptions.
- **Book Filtering**: Users can filter books by those available for borrowing, books due to be returned today, and books currently on loan. Loaned books include details of the expected return date and borrower's information (first name, last name, email address).
- **Borrowing Books**: Upon borrowing a book, users are shown the expected return date for the book.

## Tools Used

- **Frontend**: React.js
- **Backend**: Node.js and Express.js
- **Database**: MongoDB Atlas and MongoDB Compass

## How to Run the Project

### Setting Up the Project

1. First, copy the project link from GitHub.
2. Open a terminal on your local machine and clone the repository using:
    `>git clone [github-repository-link]`
3. Open the project folder.

### Running the Backend

1. In the project root folder, navigate to the `library-backend` folder using:
   `>cd library-backend`
2. Open a new terminal window and install all the backend dependencies:
    `>npm install`
3. Before running the backend in development mode, create and configure a `.env` file in the `library-backend` root folder with the following contents:

    ```js
    PORT=5000 <!-- Replace with your preferred port -->
    MONGODB_URL=[your-MongoDB-URL] <!-- Replace with your MongoDB URL -->
    JWT_SECRET=[your-JSON-WEB-TOKEN-secret] <!-- Replace with your JWT secret key -->
    MODE_ENV=development
    ```

4. To run the backend, use the command:
   `>npm run dev`

### Running the Frontend

1. To set up the frontend, navigate to the `library-frontend` folder using:
    `>cd library-frontend`
2. Open a new terminal window and install the frontend dependencies:
    `>npm install`
3. Create a `.env` file in the `library-frontend` root folder and configure it as follows:

    ```js
    REACT_APP_API_URL=http://localhost:5000 <!-- Replace with your backend running port -->
    ```

4. To start the frontend application, run:
   `>npm start`

### Database Configuration

- Set up and configure a database in MongoDB Atlas.
- In the backend, the `Models` folder contains `userModel` and `bookModel` for database interactions.

**Your Library Management System is now ready to use! Enjoy!**

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
