// routes/contact.routes.js

const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
} = require("../controllers/contact.controller");

// POST -> Create new contact request
router.post("/", createContact);

// GET -> Fetch all contact requests
router.get("/", getContacts);

module.exports = router;
