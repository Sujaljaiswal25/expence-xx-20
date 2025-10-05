const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Load env vars
dotenv.config();

// Set the public path based on environment
const publicPath = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, 'public')  // In production, build files should be in backend/public
  : path.join(__dirname, "../public");  // In development, use ../public

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/expenses", require("./routes/expenses"));

// Health check for API
app.get("/api/health", (req, res) => {
  res.json({ message: "Expense Tracker API is running" });
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Serve frontend for all non-API routes (must be last)
app.get("*", (req, res) => {
  const indexPath = process.env.NODE_ENV === 'production' 
    ? path.join(__dirname, 'public', 'index.html')
    : path.join(__dirname, "../public/index.html");
  res.sendFile(indexPath);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
