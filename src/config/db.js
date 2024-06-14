const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const conn = await mongoose.connect(URI, options);
    console.log(`Connected to MongoDB on host: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
