const express = require("express");
const Professional = require("../models/Professional");
const Service = require("../models/Service");
const Booking = require("../models/Booking");
const Review = require("../models/Review");
const User = require("../models/User");
const upload = require("../middleware/upload"); // <-- add this at top

// middleware
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

/* ================================
    PROFESSIONAL MANAGEMENT
================================ */

// Create Professional
router.post("/professionals", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { name, specialization, description, image, experience } = req.body;

    const pro = await Professional.create({
      name,
      specialization,
      description,
      image,
      experience
    });

    res.json({ message: "Professional created", pro });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating professional" });
  }
});

// Update Professional
// router.put("/professionals/:id", authMiddleware, isAdmin, async (req, res) => {
//   try {
//     const pro = await Professional.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({ message: "Professional updated", pro });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error updating professional" });
//   }
// });
router.put(
  "/professionals/:id",
  authMiddleware,
  isAdmin,
  upload.single("photo"),  // IMPORTANT
  async (req, res) => {
    try {

      const updateData = {
        name: req.body.name,
        specialization: req.body.specialization,
        description: req.body.description
      };

      // Remove image if requested
      if (req.body.removePhoto === "true") {
        updateData.image = "";
      }

      // If new image uploaded
      if (req.file) {
        updateData.image = "/uploads/" + req.file.filename;
      }

      const updatedPro = await Professional.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      res.json({ message: "Professional updated", pro: updatedPro });

    } catch (err) {
      console.log("UPDATE ERROR:", err);
      res.status(500).json({ message: "Error updating professional" }); 
    }
  }
);

// Delete Professional
router.delete("/professionals/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Professional.findByIdAndDelete(req.params.id);
    res.json({ message: "Professional deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting professional" });
  }
});
/* ================================
      SERVICE MANAGEMENT (FIXED)
================================ */
// Get ALL services (independent page)
router.get("/services", authMiddleware, isAdmin, async (req, res) => {
  try {
    const services = await Service.find()
      .populate("professionalId", "name specialization");

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching all services" });
  }
});
router.get("/services-all", authMiddleware, isAdmin, async (req, res) => {
  try {
    const services = await Service.find().populate("professionalId");
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Error fetching services" });
  }
});

// Get all services of a professional
router.get("/services/:professionalId", authMiddleware, isAdmin, async (req, res) => {
  try {
    const services = await Service.find({ professionalId: req.params.professionalId });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching services" });
  }
});

// Add service
router.post("/services", authMiddleware, isAdmin, async (req, res) => {
  try {
    const { professionalId, name, duration, price } = req.body;

    if (!professionalId || !name || !duration || !price) {
      return res.status(400).json({ message: "All fields required" });
    }

    const service = await Service.create({
      professionalId,
      name,
      duration,
      price
    });

    res.json({ message: "Service added", service });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding service" });
  }
});

// Update service
router.put("/services/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      duration: req.body.duration,
      price: req.body.price
    }, { new: true });

    res.json({ message: "Service updated", updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating service" });
  }
});

// Delete service
router.delete("/services/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting service" });
  }
});


/* ================================
    BOOKINGS (ADMIN)
================================ */

router.get("/bookings", authMiddleware, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("professionalId", "name specialization")
      .populate("slotId", "date time")
      .populate("userId", "name email")
      .lean();

    res.json(
      bookings.map((b) => ({
        _id: b._id,
        professional: b.professionalId?.name || "Unknown",
        clientName: b.userId?.name || b.clientName,
        clientEmail: b.userId?.email || b.clientEmail,
        date: b.slotId?.date || "N/A",
        time: b.slotId?.time || "N/A",
        notes: b.notes || "",
        status: b.status,
      }))
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});


// Update booking status
router.put("/bookings/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ message: "Booking status updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating status" });
  }
});


/* ================================
    REVIEWS (ADMIN)
================================ */

router.get("/reviews", authMiddleware, isAdmin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("professionalId")
      .populate("userId")
      .lean();

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

router.delete("/reviews/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review" });
  }
});

module.exports = router;
