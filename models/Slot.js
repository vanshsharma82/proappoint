const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
    required: true
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true
  },
  time: {
    type: String, // "10:00 AM", "2:30 PM"
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Slot", slotSchema);
