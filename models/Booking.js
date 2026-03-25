const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  professionalId: { type: mongoose.Schema.Types.ObjectId, ref: "Professional", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },

  clientName: String,
  clientEmail: String,
  notes: String,

  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);
