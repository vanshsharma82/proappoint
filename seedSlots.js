const mongoose = require("mongoose");
const Slot = require("./models/Slot");

async function seedSlots() {
  await mongoose.connect("mongodb://127.0.0.1:27017/appointmentDB");

  const proId = "69307524789374e69782977f"; // example Aman Kumar ID
  const date = "2025-12-04";

  const times = ["10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];

  await Slot.insertMany(
    times.map(t => ({
      professionalId: proId,
      date,
      time: t,
      isBooked: false
    }))
  );

  console.log("Slots seeded");
  process.exit(0);
}

seedSlots();
