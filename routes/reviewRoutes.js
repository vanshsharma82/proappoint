const express = require("express");
const mongoose = require("mongoose");       // ✅ FIXED (missing before)
const Review = require("../models/Review");
const Professional = require("../models/Professional");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

/* ===========================
   CREATE REVIEW (USER)
=========================== */

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { professionalId, rating, reviewText } = req.body;
    const userId = req.user.id;

    if (!professionalId || !rating) {
      return res
        .status(400)
        .json({ message: "professionalId and rating are required" });
    }

    // Create review
    const review = await Review.create({
      professionalId,
      userId,
      rating,
      comment: reviewText    // ✅ FIXED: store correctly
    });

    /* ===========================
       UPDATE PROFESSIONAL RATING
    ============================ */

    const agg = await Review.aggregate([
      { $match: { professionalId: new mongoose.Types.ObjectId(professionalId) } },
      {
        $group: {
          _id: "$professionalId",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 }
        }
      }
    ]);

    if (agg.length > 0) {
      await Professional.findByIdAndUpdate(professionalId, {
        rating: Math.round(agg[0].avgRating * 10) / 10,
        ratingCount: agg[0].count
      });
    }

    res.json({ message: "Review added", review });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding review" });
  }
});

/* ===========================
   GET REVIEWS FOR A PROFESSIONAL
=========================== */

router.get("/:professionalId", async (req, res) => {
  try {
    const reviews = await Review.find({
      professionalId: req.params.professionalId
    }).populate("userId", "name photo");

    res.json(reviews);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

/* ===========================
   DELETE REVIEW (ADMIN)
=========================== */

router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted", review: deleted });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting review" });
  }
});

module.exports = router;
