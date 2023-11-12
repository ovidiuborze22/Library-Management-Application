const mongoose = require("mongoose");

// Book Model
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  status: {
    type: String,
    required: true,
    enum: ["available", "on loan", "due today"],
    default: "available",
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  expectedReturnDate: { type: Date, default: null },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
