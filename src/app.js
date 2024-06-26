const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const ConnectDB = require("./config/db");
const Mahasiswa = require("./models/mahasiswa"); // Import Mahasiswa model
const router = require("./routes/mahasiswa");

const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

ConnectDB();

app.use("/api/mahasiswa", router);

// Middleware to fetch Mahasiswa data for documentation
app.use(async (req, res, next) => {
  try {
    const mahasiswas = await Mahasiswa.find();
    res.locals.mahasiswas = mahasiswas; // Make mahasiswas data available in templates
    next();
  } catch (error) {
    console.error("Error fetching mahasiswas:", error);
    next(error);
  }
});

// Server
app.get("/", (req, res) => {
  res.render("index"); // Render index.ejs template
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
