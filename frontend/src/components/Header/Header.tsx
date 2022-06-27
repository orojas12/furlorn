import React, { useState } from "react";

import logo from "../../assets/furlorn_logo.svg";
import Nav from "../Nav/Nav";
import NavToggle from "../Nav/NavToggle";
import Button from "../Button/Button";

import "./Header.scss";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="Header">
      <div className="Header__top">
        <ul className="Header__list">
          <li>
            <a href="" className="Header__link--logo">
              <img className="Header__logo" src={logo} alt="Logo" />
            </a>
          </li>
          <li>
            <a href="" className="Header__link">
              about
            </a>
          </li>
          <li>
            <a href="" className="Header__link">
              search lost pets
            </a>
          </li>
        </ul>
        <div className="Header__buttons">
          <Button type="primary" onClick={(e) => console.log("Login")}>
            Log in
          </Button>
          <Button type="secondary" onClick={(e) => console.log("Sign up")}>
            Sign up
          </Button>
        </div>
        <NavToggle setIsOpen={setIsNavOpen} />
      </div>

      <div className="Header__bottom">{isNavOpen ? <Nav /> : null}</div>
    </header>
  );
}
