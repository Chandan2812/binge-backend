const Lead = require("../models/lead.model");
const sendEmail = require("../utils/sendEmail");

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      bookingType,
      dateTime,
      numberOfGuests,
      message,
    } = req.body;

    // Simple validation
    if (
      !fullName ||
      !phoneNumber ||
      !email ||
      !bookingType ||
      !dateTime ||
      !numberOfGuests
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled.",
      });
    }

    // Save lead to DB
    const lead = new Lead({
      fullName,
      phoneNumber,
      email,
      bookingType,
      dateTime,
      numberOfGuests,
      message,
    });

    await lead.save();

    // Send email notification to website owners
    const owners = ["nitikakhatri683@gmail.com"]; // <-- replace with real emails

    const emailSubject = `New ${bookingType} Booking Request`;
    const emailBody = `
      <h2>New Booking Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phoneNumber}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Booking Type:</strong> ${bookingType}</p>
      <p><strong>Date & Time:</strong> ${new Date(
        dateTime
      ).toLocaleString()}</p>
      <p><strong>Number of Guests:</strong> ${numberOfGuests}</p>
      <p><strong>Message:</strong> ${message || "—"}</p>
    `;

    // Send email to each owner
    await Promise.all(
      owners.map((ownerEmail) =>
        sendEmail({
          to: ownerEmail,
          subject: emailSubject,
          html: emailBody,
        })
      )
    );

    res.status(201).json({
      success: true,
      message: "Booking request submitted successfully!",
      lead,
    });
  } catch (error) {
    console.error("Booking creation failed:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Get all bookings (admin)
exports.getBookings = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, leads });
  } catch (error) {
    console.error("Fetching bookings failed:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
