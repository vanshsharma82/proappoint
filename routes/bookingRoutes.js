const express = require("express");
const mongoose = require("mongoose");
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");
const Professional = require("../models/Professional");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");


const router = express.Router();

/* ---------------------- CREATE BOOKING ---------------------- */
router.post("/", async (req, res) => {
  try {
    const { professionalId, date, time, userId } = req.body;

    if (!professionalId || !date || !time || !userId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Validate professionalId exists in DB
    const professional = await Professional.findById(professionalId);
    if (!professional) {
      return res.status(404).json({ message: "Professional not found" });
    }

    // Validate user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure professionalId is ObjectId to avoid CastError
    const pid = new mongoose.Types.ObjectId(professionalId);

    // Find slot
    let slot = await Slot.findOne({ professionalId: pid, date, time });

    // If slot doesn't exist → create it safely
    if (!slot) {
      slot = await Slot.create({
        professionalId: pid,
        date,
        time,
        isBooked: false
      });
    }

    // Slot already booked?
    if (slot.isBooked) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // Create booking
    const booking = await Booking.create({
      slotId: slot._id,
      professionalId: pid,
      clientName: user.name,
      clientEmail: user.email,
      status: "confirmed",
      userId: user._id
    });

    // Mark slot booked
    slot.isBooked = true;
    await slot.save();

    res.json({
      message: "Appointment booked successfully",
      booking,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Booking failed" });
  }
});

/* ---------------------- GET USER'S BOOKINGS ---------------------- */
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("slotId")
      .populate("professionalId")
      .lean();

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

/* ---------------------- CANCEL BOOKING ---------------------- */
router.put("/cancel/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Free slot if exists
    const slot = await Slot.findById(booking.slotId);
    if (slot) {
      slot.isBooked = false;
      await slot.save();
    }

    // Update booking status
    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Appointment cancelled successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
});

/* ---------------------- ADMIN: GET ALL BOOKINGS ---------------------- */
router.get("/bookings", authMiddleware, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("slotId")            // includes date + time
      .populate("professionalId")    // includes name
      .lean();

    const formatted = bookings.map((b) => ({
      _id: b._id,
      professional: b.professionalId?.name || "Unknown",
      clientName: b.clientName,
      clientEmail: b.clientEmail,
      date: b.slotId?.date || "N/A",
      time: b.slotId?.time || "N/A",
      notes: b.notes || "",
      status: b.status,
    }));

    res.json(formatted);
  } catch (err) {
    console.log("BOOKING FETCH ERROR:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});


module.exports = router;
