import React from "react";

import logo from "../../assets/furlorn_logo.svg";

import "./Nav.scss";

export default function Nav() {
  return (
    <nav className="Nav">
      <ul className="Nav__list">
        <li>
          <a href="" className="Nav__link">
            Log in / Sign up
          </a>
        </li>
        <li>
          <a href="" className="Nav__link">
            About
          </a>
        </li>
        <li>
          <a href="" className="Nav__link">
            Search lost pets
          </a>
        </li>
      </ul>
    </nav>
  );
}
