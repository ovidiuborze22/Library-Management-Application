const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// book routes
router.get("/", authMiddleware, async (req, res) => {
  try {
    let query = {};
    if (req.query.status) {
      query.status = req.query.status; // Filters based on book status if query parameter is provided
    }
    // Populate borrower details
    const books = await Book.find(query).populate(
      "borrower",
      "firstName lastName email"
    );
    res.send(books);
  } catch (e) {
    res.status(500).send("Failed to retrieve books");
  }
});

// Add a route for creating a new book with an image
router.post("/create", authMiddleware, upload, async (req, res) => {
  try {
    const { title, description } = req.body;
    let imagePath = "";
    if (req.file) {
      imagePath = req.file.path; // The path where the image is saved
    }
    const book = new Book({ title, description, image: imagePath });
    await book.save();
    res.status(201).send(book);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Borrow book route
router.post("/borrow/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }
    if (book.status === "available") {
      const borrowDate = new Date(); // Current date as borrow date
      const expectedReturnDate = new Date();
      expectedReturnDate.setDate(borrowDate.getDate() + 7); // Set expected return date 5 days after borrow date

      // Set the book status based on the expected return date
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize today's date for comparison
      expectedReturnDate.setHours(0, 0, 0, 0); // Normalize expected return date

      // Compare the dates to set the status
      if (expectedReturnDate.getTime() === today.getTime()) {
        book.status = "due today";
      } else {
        book.status = "on loan";
      }

      book.borrower = req.user._id;
      book.expectedReturnDate = expectedReturnDate;

      await book.save();
      res.send(book);
    } else {
      res.status(400).send({ error: "Book is not available for borrowing" });
    }
  } catch (e) {
    res.status(500).send("Failed to borrow the book");
  }
});

module.exports = router;
