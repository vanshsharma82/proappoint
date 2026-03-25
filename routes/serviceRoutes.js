const express = require("express");
const Service = require("../models/Service");

const router = express.Router();

// GET services for one professional
router.get("/:professionalId", async (req, res) => {
  const services = await Service.find({ professionalId: req.params.professionalId });
  res.json(services);
});

// ADD service
router.post("/", async (req, res) => {
  try {
    const newService = await Service.create(req.body);
    res.json(newService);
  } catch (err) {
    res.status(500).json({ message: "Error adding service" });
  }
});

// UPDATE service
router.put("/:id", async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE service
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
