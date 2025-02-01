import React from "react";
import { Routes, Route } from "react-router-dom"; // Import necessary components for routing
import CombinedFormAndUsers from "./components/CombinedFormAndUsers"; // Import the new component

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<CombinedFormAndUsers />} />
      </Routes>
    </div>
  );
}

export default App;
