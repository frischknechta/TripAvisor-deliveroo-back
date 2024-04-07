const express = require("express");
const router = express.Router();

const axios = require("axios");

const formdata = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formdata);
const client = mailgun.client({
  username: "Adrien",
  key: process.env.API_KEY_MAILGUN,
});

router.post("/contact-form", async (req, res) => {
  try {
    console.log(req.body);

    const { firstname, lastname, email, message } = req.body;

    if (!firstname || !lastname || !email || !message) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const messageData = {
      from: `${firstname} ${lastname} <${email}>`,
      to: "frischknecht.adrien@gmail.com",
      subject: "Contact Form TripAdvisor",
      text: message,
    };

    const response = await client.messages.create(
      process.env.DOMAIN_MAILGUN,
      messageData
    );

    console.log(response);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
