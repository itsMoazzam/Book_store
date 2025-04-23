// import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import DeleteBook from "./DeletBook";
import UpdateBook from "./upDatebook";

const BookList = ({ books }) => {
  if (books.length === 0) {
    return (
      <>
        <Skeleton animation="wave" variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton
          animation="pulse"
          variant="rectangular"
          sx={{ height: 150 }}
        />
        <Skeleton animation="false" variant="text" sx={{ fontSize: "2rem" }} />
        <Skeleton variant="rectangular" sx={{ height: 150 }} />
        <Skeleton sx={{ fontSize: "2rem" }} />
      </>
    );
  }
  const removeBook = (deletedId) => {
    books.filter((b) => b._id !== deletedId);
  };
  const handleBookUpdated = (updatedId) => {
    // You might want to fetch the updated book or update local state
    console.log(`Book ${updatedId} updated`);
    // Optionally: setBooks(updatedBooksArray) or trigger a refetch
  };
  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      >
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id} sx={{ boxShadow: 4 }}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {book.title}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ${book.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <UpdateBook
                    bookId={book._id}
                    bookTitle={book.title}
                    onUpdated={handleBookUpdated}
                  />
                  <DeleteBook
                    bookId={book._id}
                    bookTitle={book.title}
                    onDeleted={removeBook}
                  />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BookList;
