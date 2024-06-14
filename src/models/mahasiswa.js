const mongoose = require("mongoose");

// Create a counter schema for maintaining auto-incremented values
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 },
});

// Define a model for the counter
const Counter = mongoose.model("counter", counterSchema);

// Define your main schema for Mahasiswa
const mahasiswaSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    major: { type: String, required: true },
  },
  { timestamps: true }
);

// Middleware to auto-increment the id field
mahasiswaSchema.pre("save", function (next) {
  var doc = this;
  Counter.findByIdAndUpdate(
    { _id: "mahasiswaId" },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  )
    .then(function (count) {
      doc.id = count.sequence_value;
      next();
    })
    .catch(function (error) {
      console.error("Counter error:", error);
      throw error;
    });
});

const Mahasiswa = mongoose.model("Mahasiswa", mahasiswaSchema);

module.exports = Mahasiswa;
