const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "✅ WebCraft Studio API is live on Netlify!" });
});

// Example contact form handler
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("📩 Message received:", { name, email, subject, message });
  res.json({ success: true, message: "Message received successfully!" });
});

module.exports.handler = serverless(app);
