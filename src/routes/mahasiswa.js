const express = require("express");
const router = express.Router();
const Mahasiswa = require("../models/mahasiswa");

// Create a new mahasiswa
router.post("/", async (req, res) => {
  try {
    const mahasiswa = new Mahasiswa(req.body);
    await mahasiswa.save();
    res.status(201).json(mahasiswa);
  } catch (error) {
    console.error("Error:", error);
    if (error.code === 11000) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

// Get all mahasiswas
router.get("/", async (req, res) => {
  try {
    const mahasiswas = await Mahasiswa.find();
    res.status(200).json(mahasiswas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific mahasiswa by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const mahasiswa = await Mahasiswa.findOne({ id: id });

    if (!mahasiswa) {
      return res.status(404).json({ error: "Mahasiswa not found" });
    }

    res.json(mahasiswa);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update a mahasiswa by ID
router.put("/:id", async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!mahasiswa) {
      return res.status(404).json({ error: "Mahasiswa not found" });
    }
    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a mahasiswa by ID
router.delete("/:id", async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findByIdAndDelete(req.params.id);
    if (!mahasiswa) {
      return res.status(404).json({ error: "Mahasiswa not found" });
    }
    res.status(200).json({ message: "Mahasiswa deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
