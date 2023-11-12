const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");
const bookRoutes = require("./routes/booksRoute");
const errorHandler = require("./middleware/errorMiddleware");
const cors = require("cors");
const cron = require("node-cron");
const Book = require("./models/bookModel");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(errorHandler);
// Enable CORS for all routes and origins
app.use(cors());

// Database connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Scheduled job to update book statuses
cron.schedule("0 0 * * *", async () => {
  // Runs every day at midnight
  console.log("Running a daily task to update book statuses...");

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1); // Set to start of yesterday

  try {
    // Update books that are 'due today' to 'available'
    const resultAvailable = await Book.updateMany(
      {
        status: "due today",
        expectedReturnDate: { $lte: yesterday },
      },
      { $set: { status: "available" } }
    );
    console.log(`Books made available: ${resultAvailable.nModified}`);

    // Update books that are 'on loan' and due today to 'due today'
    const resultDueToday = await Book.updateMany(
      {
        status: "on loan",
        expectedReturnDate: {
          $gte: today,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Less than tomorrow
        },
      },
      { $set: { status: "due today" } }
    );
    console.log(`Books marked as due today: ${resultDueToday.nModified}`);
  } catch (error) {
    console.error("Error updating book statuses:", error);
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
});
