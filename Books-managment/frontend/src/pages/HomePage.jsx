import React, { useEffect, useState } from "react";
import axios from "axios";
import BookList from "../component/BookList";
import SearchBar from "../component/SearchBar";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async (author = "") => {
    try {
      const url = author
        ? `http://localhost:5000/api/books/search?author=${author}`
        : "http://localhost:5000/api/books";
      const response = await axios.get(url);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = (author) => {
    setSearchTerm(author);
    fetchBooks(author);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Book Management System</h1>
      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
      <BookList books={books} />
    </div>
  );
};

export default HomePage;
