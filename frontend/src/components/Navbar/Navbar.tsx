import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/icons/furlorn_logo.svg";

import "./Navbar.scss";

export interface INavbarProps {
  type: string;
  children?: React.ReactNode;
}

export default function Navbar({ type, children = null }: INavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((prevState) => !prevState);
  }

  return (
    <nav className="Nav">
      <div className="Nav__top">
        <div className="logo">
          <Link to="/">
            <img className="Header-container__logo" src={logo} alt="Logo" />
          </Link>
        </div>
        {children}
        <button className="Nav__toggle" onClick={handleToggle}>
          <div className="Nav__toggle-bar"></div>
          <div className="Nav__toggle-bar"></div>
          <div className="Nav__toggle-bar"></div>
        </button>
      </div>
      {isOpen ? <div className="Nav__bottom">{children}</div> : null}
    </nav>
  );
}
