const express = require("express");
const Professional = require("../models/Professional");
const Service = require("../models/Service");
const Slot = require("../models/Slot");

const router = express.Router();

// GET /professionals
router.get("/", async (req, res) => {
  const pros = await Professional.find();

  const data = await Promise.all(
    pros.map(async (p) => {
      const services = await Service.find({ professionalId: p._id || null });
      return { ...p.toObject(), services };
    })
  );

  res.json(data);
});
// GET /professionals/:id  → Get a single professional
router.get("/:id", async (req, res) => {
  try {
    const pro = await Professional.findById(req.params.id);

    if (!pro) {
      return res.status(404).json({ message: "Professional not found" });
    }

    // Fetch services for that professional
    const services = await Service.find({ professionalId: pro._id });

    res.json({ 
      ...pro.toObject(),
      services 
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching professional details" });
  }
});


// GET /professionals/:id/availability
router.get("/:id/availability", async (req, res) => {
  const { id } = req.params;
  const { date, serviceId } = req.query;

  let query = { professionalId: id, status: "available" };

  if (serviceId) query.serviceId = serviceId;
  if (date) query.startIso = new RegExp(`^${date}`);

  const slots = await Slot.find(query).populate("serviceId");

  res.json(
    slots.map((s) => ({
      id: s._id,
      serviceName: s.serviceId.name,
      durationMinutes: s.durationMinutes,
      startIso: s.startIso,
    }))
  );
});


module.exports = router;
