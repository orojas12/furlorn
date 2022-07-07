import React, { useState } from "react";

import Navbar from "../Navbar/Navbar";

import "./Header.scss";

export default function Header() {
  return (
    <header className="Header">
      <div className="Header-container">
        <Navbar type="horizontal">
          <a href="#about">about</a>
          <a href="#signup">view lost pets</a>
        </Navbar>
      </div>
    </header>
  );
}
