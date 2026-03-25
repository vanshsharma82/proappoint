const express = require("express");
const Slot = require("../models/Slot");
const router = express.Router();

// GET slots for professional + date
router.get("/:professionalId/:date", async (req, res) => {
  try {
    const { professionalId, date } = req.params;
    const slots = await Slot.find({ professionalId, date });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create slots (admin use)
router.post("/", async (req, res) => {
  try {
    const { professionalId, date, times } = req.body;

    const slotDocs = times.map(t => ({
      professionalId,
      date,
      time: t,
      isBooked: false
    }));

    const slots = await Slot.insertMany(slotDocs);

    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// BOOK A SLOT
router.post("/book", async (req, res) => {
  try {
    const { slotId } = req.body;

    const slot = await Slot.findById(slotId);
    if (!slot) return res.status(404).send("Slot not found");

    if (slot.isBooked) return res.status(400).send("Slot already booked");

    slot.isBooked = true;
    await slot.save();

    res.json({ message: "Appointment booked", slot });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
