// controllers/contact.controller.js

const Contact = require("../models/contact.model");

// POST - Create a new contact request
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Your query submitted successfully",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// GET - Fetch all contact requests
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
