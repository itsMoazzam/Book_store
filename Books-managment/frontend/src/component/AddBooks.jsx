import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import Container from "@mui/material/Container"; // layout container
import Box from "@mui/material/Box"; // layout & form wrapper
import TextField from "@mui/material/TextField"; // input with label and validation :contentReference[oaicite:2]{index=2}
import Button from "@mui/material/Button";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/books", {
        title,
        author,
        price: parseFloat(price)
      });
      alert("Book added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book");
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 4
          }}
        >
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Author Field */}
          <TextField
            label="Author"
            variant="outlined"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <TextField
            label="Price"
            variant="outlined"
            type="number"
            inputProps={{ step: "0.01" }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <TextField label="" variant="outlined" type="file" />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button type="submit" variant="contained" color="primary">
              Add Book
            </Button>
            <Tooltip title="Back to home page">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate("/")}
              >
                Back to List
              </Button>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddBook;
