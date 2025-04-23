const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  searchBooks,
  addBook,
  deletebook,
  updateBook
} = require("../controllers/books");

// Get all books
router.get("/", getAllBooks);

// Search books by author
router.get("/search", searchBooks);

// Add a new book
router.post("/", addBook);
// Delete a book
router.delete("/:id", deletebook);
// Update a book
router.put("/:id", updateBook);

module.exports = router;
