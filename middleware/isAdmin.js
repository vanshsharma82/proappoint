const User = require("../models/User");

module.exports = async function isAdmin(req, res, next) {
  try {
    // authMiddleware should already decode token and set req.user.id
    if (!req.user || !req.user.id) return res.status(401).json({ message: "Unauthorized" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
