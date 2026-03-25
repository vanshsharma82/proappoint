const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// const fileUpload = require("express-fileupload");


require("dotenv").config();

const professionalRoutes = require("./routes/professionalRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const slotRoutes = require("./routes/slotRoutes");
const authRoutes = require("./routes/authRoutes"); 
const adminRoutes = require("./routes/adminRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const serviceRoutes = require("./routes/serviceRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");







const app = express();
app.use(cors());
app.use(bodyParser.json());

// app.use(fileUpload());



// MongoDB Connection
// mongoose
// .connect("mongodb://127.0.0.1:27017/appointmentDB")
// .then(() => console.log("MongoDB connected"))
// .catch((err) => console.log(err));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected to Atlas"))
  .catch((err) => console.log(err));

// Routes
app.use("/auth", authRoutes);                    
app.use("/professionals", professionalRoutes);
app.use("/bookings", bookingRoutes);
app.use("/slots", slotRoutes);
app.use("/admin", adminRoutes);
app.use("/reviews", reviewRoutes);
app.use("/services", serviceRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/uploads", express.static("uploads"));
app.listen(4000, () => console.log("Server running on port 4000"));
