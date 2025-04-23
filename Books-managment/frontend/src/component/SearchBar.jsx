import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const SearchBar = ({ onSearch, searchTerm }) => {
  const [searchInput, setSearchInput] = useState(searchTerm || "");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <>
      <Container onSubmit={handleSearch} className="mb-4">
        <TextField
          type="text"
          placeholder="Search by author..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          sx={{ width: 1 / 2, minWidth: 300 }}
        />
        <Button variant="outlined" type="submit" sx={{ p: 1.8 }}>
          <CiSearch size={25} />
          Search
        </Button>
      </Container>

      <Button
        variant="contained"
        onClick={() => navigate("/add-book")}
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          m: 3,
          color: "#fff"
        }}
      >
        <Tooltip title="Add new Books ">
          <CiCirclePlus size={45} />
        </Tooltip>
      </Button>
    </>
  );
};

export default SearchBar;
