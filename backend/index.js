require('dotenv').config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());  // Allow frontend communication
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(" Connected to MongoDB"))
.catch((err) => console.error(" MongoDB Connection Failed:", err));

const credential = mongoose.model("credential", {}, "user_credential");

// Route to Send Emails
app.post("/sendmail", async (req, res) => {
  const { msg, emailList, senderEmail, senderPassword } = req.body;

  // Validate request data
  if (!msg || !emailList || emailList.length === 0 || !senderEmail || !senderPassword) {
      return res.status(400).json({ error: "All fields are required" });
  }

  // Create Transporter
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: senderEmail,
          pass: senderPassword, // Use App Password instead of actual password
      },
  });

  try {
      // Send emails
      for (let email of emailList) {
          await transporter.sendMail({
              from: senderEmail,
              to: email,
              subject: "A message from Bulkify Mail",
              text: msg,
          });
          console.log(`Email sent to: ${email}`);
      }

      res.json(true);
  } catch (error) {
      console.error(" Email Sending Error:", error);
      res.status(500).json({ error: error.message || "Failed to send emails" });
  }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server started on port ${PORT}...`));
