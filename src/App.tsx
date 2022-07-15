import React from "react";
import { Outlet } from "react-router-dom";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <nav></nav>
      <Outlet />
    </div>
  );
}

export default App;
