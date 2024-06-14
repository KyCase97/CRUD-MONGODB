const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hallo");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});