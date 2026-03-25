const express = require("express");
const Feedback = require("../models/Feedback");

const router = express.Router();

// ---------------- ADD FEEDBACK ----------------
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await Feedback.create({ name, email, message });

    res.json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- GET ALL FEEDBACK (ADMIN – optional) ----------------
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedback" });
  }
});

module.exports = router;
