const mongoose = require("mongoose");

const ProfessionalSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  description: String,
  image: { type: String, default: "" },
  experience: { type: String, default: "5+ years" },
  rating: { type: Number, default: 4.0 },
  ratingCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Professional", ProfessionalSchema);
