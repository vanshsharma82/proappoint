const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Professional",
    required: true
  },
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  price: { type: Number, required: true }
});

module.exports = mongoose.model("Service", ServiceSchema);
