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
      <div className="Header-container">
        <div className="Header-container__top">
          <ul className="Header-container__list">
            <li>
              <a href="" className="Header-container__link--logo">
                <img className="Header-container__logo" src={logo} alt="Logo" />
              </a>
            </li>
            <li>
              <a href="" className="Header-container__link">
                about
              </a>
            </li>
            <li>
              <a href="" className="Header-container__link">
                search lost pets
              </a>
            </li>
          </ul>
          <div className="Header-container__buttons">
            <Button
              type="button"
              btnStyle="primary"
              width="100px"
              onClick={(e) => console.log("Login")}
            >
              Log in
            </Button>
            <Button
              type="button"
              btnStyle="secondary"
              width="100px"
              onClick={(e) => console.log("Sign up")}
            >
              Sign up
            </Button>
          </div>
          <NavToggle setIsOpen={setIsNavOpen} />
        </div>

        <div className="Header-container__bottom">
          {isNavOpen ? <Nav /> : null}
        </div>
      </div>
    </header>
  );
}
