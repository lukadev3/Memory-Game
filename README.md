# Memory Game

A simple **Memory Game** application built with **Angular** and **Node.js**. Users can register, log in, play memory games, view their game history, and check the leaderboard.  

---

## Features

- **User Authentication**
  - Register and login with email and password
  - Token-based authentication using cookies
- **Gameplay**
  - Play memory matching game
  - Track score, moves, and duration for each game
- **Profile**
  - View user profile and past games
  - Delete user account
- **Leaderboard**
  - View top players based on average ranking score
- **Guards**
  - AuthGuard for protecting routes
  - GuestGuard for redirecting logged-in users

---

## Tech Stack

- **Frontend:** Angular, TypeScript, HTML, CSS  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Authentication:** JWT tokens stored in cookies  
- **HTTP Client:** Angular HttpClient  
- **State Management:** Services (AuthService, GameService)

---

## How To Run

To run this project, you need to have **Node.js**, **Angular CLI**, and **MongoDB** installed on your system.  
It is also recommended to install **MongoDB Compass** to easily monitor your database.

### 1. Install dependencies

1. Open a terminal and navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Install backend dependencies:

    ```bash
    npm install
    ```

3. Open another terminal and navigate to the frontend folder:

    ```bash
    cd frontend
    ```

4. Install frontend dependencies:

    ```bash
    npm install
    ```

---

### 2. Start the servers

1. Start the backend server:

    ```bash
    node index.js
    ```

2. Start the frontend server:

    ```bash
    ng serve
    ```

---

### 3. Access the application

- Open your browser and go to **http://localhost:4200** to use the frontend.  
- The backend API will run on **http://localhost:3000**.  
- Optionally, use **MongoDB Compass** to monitor your MongoDB database.
