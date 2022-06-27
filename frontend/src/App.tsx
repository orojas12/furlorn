import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
