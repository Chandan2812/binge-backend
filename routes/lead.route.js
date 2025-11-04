const express = require("express");
const router = express.Router();
const leadController = require("../controllers/lead.controller");

// Create a new booking
router.post("/", leadController.createBooking);

// Get all bookings (for admin)
router.get("/", leadController.getBookings);

module.exports = router;
