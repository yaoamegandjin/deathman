 
# 🕹️ Deathman - A MERN Stack Hangman Game

Welcome to **Deathman**, a modern twist on the classic Hangman game built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). Sign up, log in, and compete on the global leaderboard to see how you stack up against players around the world!

**🎯 Live Site:** [https://deathman.vercel.app/](https://deathman.vercel.app/)


## 🔥 Features

- 🧠 Classic Hangman gameplay
- 🔐 User authentication (signup, login, logout)
- 🔁 Forgot password functionality (via email with Nodemailer)
- 🏆 Global leaderboard
- 🎨 Toast notifications and clean UI/UX
- 🌐 Fully responsive design

## 🛠️ Built With

- **MongoDB** – Database for user accounts and scores  
- **Express.js** – Backend framework for APIs  
- **React.js** – Frontend library for UI  
- **Node.js** – Backend runtime environment  

## 📚 Useful Resources

- [React documentation](https://reactjs.org/) – Best place to learn React  
- [How to Secure Your MERN Stack App with JWT-Based User Authentication and Authorization](https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/) – Great guide for handling JWT auth and frontend UI 
- [Mastering User Authentication: MERN Stack Login Page (Part 1 — Backend)](https://javascript.plainenglish.io/mern-stack-authentication-part-1-41b72bd2e8f3) – Helped set up backend auth
- [Mastering User Authentication (Part 2 — Frontend)](https://javascript.plainenglish.io/mern-stack-authentication-part-2-cd2036deedb4) – Helped with connecting frontend and backend
- [A Guide to Deploy Your MERN App on Render](https://dev.to/producthackers/deploying-a-mern-stack-app-on-render-1fkb) – Perfect for hosting tips
- [How to Deploy MERN Full-Stack to Render](https://medium.com/@aminnairi/how-to-deploy-mern-full-stack-to-render-6b23f56f7c2e) – Another helpful Render guide
- [How to Implement Forgot Password Functionality with JWT Authentication](https://medium.com/@mail2pranjalrai/forgot-password-in-mern-stack-using-jwt-bc12eaf4f2f2) – For email-based password reset
- [Using Nodemailer with Gmail](https://nodemailer.com/usage/using-gmail/) – Used to sent emails for password resets

## 🧪 Getting Started Locally

1. **Clone the repository**
  ```bash
  git clone https://github.com/yaoamegandjin/deathman.git
  ```
2. **Install dependencies**
  ```bash
  cd server
  npm install
  cd ../client
  npm install
  ```
3. **Set up environment variables**
Create a .env file in the /backend directory with the following keys:
  ```env
  MONGO_URL=your_mongodb_connection_string
  PORT=8000
  SECRET_KEY=your_jwt_secret_key
  RESET_PASSWORD_KEY=your_password_reset_key
  GOOGLE_EMAIL=your_email@gmail.com
  GOOGLE_EMAIL_APPS_PW=your_gmail_app_password
  ```
4. **Run the app**
  ```bash
  # Start server
  cd server
  npm start

  # start client
  cd ../client
  npm start
  ```
## 📬 Feedback

Have suggestions or found a bug? Feel free to open an issue or submit a pull request. Contributions are always welcome!

