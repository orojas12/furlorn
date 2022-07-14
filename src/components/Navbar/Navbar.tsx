import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/icons/furlorn_logo.svg";
import Sidebar from "../Sidebar/Sidebar";
import "./Navbar.scss";

export interface INavbarProps {
  children?: React.ReactNode;
}

export default function Navbar({ children = null }: INavbarProps) {
  const [showSidebar, setShowSidebar] = useState(false);

  function handleToggle() {
    setShowSidebar((prevState) => !prevState);
  }

  return (
    <nav className="Nav">
      <div className="Nav__top">
        <div className="logo">
          <Link to="/">
            <img style={{ height: "3.6rem" }} src={logo} alt="Logo" />
          </Link>
        </div>
        {children}
        <button className="Nav__toggle" onClick={handleToggle}>
          <div className="Nav__toggle-bar"></div>
          <div className="Nav__toggle-bar"></div>
          <div className="Nav__toggle-bar"></div>
        </button>
      </div>
      {showSidebar ? (
        <div className="Nav__backdrop" onClick={handleToggle} />
      ) : null}
      <Sidebar show={showSidebar} side="right" onHide={handleToggle}>
        {children}
      </Sidebar>
    </nav>
  );
}
