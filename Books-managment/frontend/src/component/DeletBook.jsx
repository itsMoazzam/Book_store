// DeleteBook.jsx
import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from "axios";

const DeleteBook = ({ bookId, bookTitle, onDeleted }) => {
  const handleDeletion = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      alert(`Book "${bookTitle}" deleted successfully. Refresh the page`);
      onDeleted(bookId);
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Error deleting book");
    }
  };

  return (
    <Tooltip title={`Delete "${bookTitle}"`}>
      <Button
        id={bookId} // in case you ever need e.currentTarget.id
        onClick={handleDeletion}
        color="error"
        aria-label={`delete-${bookId}`}
      >
        <AiTwotoneDelete size={25} />
      </Button>
    </Tooltip>
  );
};

export default DeleteBook;
