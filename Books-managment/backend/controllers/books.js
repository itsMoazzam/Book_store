const Book = require("../models/Book");

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search books by author
exports.searchBooks = async (req, res) => {
  try {
    const author = req.query.author;
    const books = await Book.find({ author: new RegExp(author, "i") });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  const book = await new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
    console.log("Book added successfully");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.deletebook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
    console.log("Book deleted successfully");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: error.message });
  }
};
// Update a book
exports.updateBook = async (req, res) => {
  const bookId = req.params.id;
  const { title, author, price } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author, price },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
    console.log("Book updated successfully");
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(400).json({ message: error.message });
  }
};
