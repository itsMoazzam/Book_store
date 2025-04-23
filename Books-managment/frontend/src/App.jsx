import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-book" element={<AddBookPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
