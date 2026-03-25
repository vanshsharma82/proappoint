const mongoose = require("mongoose");
const Professional = require("./models/Professional");

async function seed() {
  await mongoose.connect("mongodb://127.0.0.1:27017/appointmentDB");
  console.log("Connected");

  // remove existing (optional)
  await Professional.deleteMany({});

  const data = [
    { name: "Dr. Aman Kumar", specialization: "Dentist", description: "Teeth specialist" },
    { name: "Dr. Priya Sharma", specialization: "Dermatologist", description: "Skin and hair" },
    { name: "Dr. Rahul Verma", specialization: "Pediatrician", description: "Kids specialist" },
    { name: "Dr. Neha Gupta", specialization: "Physiotherapist", description: "Rehab & therapy" }
  ];

  await Professional.insertMany(data);
  console.log("Seeded professionals");
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
