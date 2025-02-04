require('dotenv').config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Failed to connect"));

const credential = mongoose.model("credential", {}, "user_credential");

app.post("/sendmail", function (req, res) {
  const { msg, emailList, senderEmail, senderPassword } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: senderPassword,
    },
  });

  new Promise(async (resolve, reject) => {
    try {
      for (let i = 0; i < emailList.length; i++) {
        await transporter.sendMail({
          from: senderEmail,
          to: emailList[i],
          subject: "A message from Bulkify Mail",
          text: msg,
        });
      }
      resolve("success");
    } catch (error) {
      reject("failed");
    }
  })
    .then(() => res.send(true))
    .catch(() => res.send(false));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))