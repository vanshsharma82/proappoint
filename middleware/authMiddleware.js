const jwt = require("jsonwebtoken");
// const JWT_SECRET = "your-secret-key";
require("dotenv").config();

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains { id: user._id }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
