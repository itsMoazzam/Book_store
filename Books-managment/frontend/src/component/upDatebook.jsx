import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import { FaEdit } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

const UpdateBook = ({
  bookId,
  bookTitle,
  bookAuthor,
  bookPrice,
  bookDescription,
  onUpdated
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: bookTitle,
    author: bookAuthor,
    price: bookPrice,
    description: bookDescription || ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/books/${bookId}`, formData);
      onUpdated(bookId, formData);
      handleClose();
      alert("Book updated successfully!");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book");
    }
  };

  return (
    <>
      <Tooltip title={`Edit "${bookTitle}"`}>
        <Button
          onClick={handleClickOpen}
          color="primary"
          aria-label={`edit-${bookId}`}
        >
          <FaEdit size={25} />
        </Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Book Details</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="author"
              label="Author"
              type="text"
              fullWidth
              variant="standard"
              value={formData.author}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              variant="standard"
              value={formData.price}
              onChange={handleChange}
              inputProps={{ step: "0.01", min: "0" }}
              required
            />
            <TextField
              margin="dense"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default UpdateBook;
