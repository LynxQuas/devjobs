require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
const userController = require("./controllers/userController");

const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

let server;

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

// routes
app.use("/api/jobs", jobRoutes);
app.post("/api/user", userController.login);

// connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Database connected!");
  } catch (err) {
    console.log("Database connection failed.", err);
    process.exit(1);
  }
};

// start the server
const startServer = () => {
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// graceful shutdown.
const gracefulShutdown = async () => {
  try {
    console.log("Shutting down gracefully...");
    await mongoose.connection.close();
    console.log("Database connection closed.");
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  } catch (err) {
    console.log("Error during graceful shutdown.", err);
    process.exit(1);
  }
};

// initialize application
const main = async () => {
  await connectDB();
  startServer();

  process.on("SIGINT", gracefulShutdown);
  process.on("SIGTERM", gracefulShutdown);
};

// start appliaction
main();
