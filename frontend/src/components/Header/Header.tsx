import { Link } from "react-router-dom";

import Navbar from "../Navbar/Navbar";

import "./Header.scss";

export default function Header() {
  return (
    <header className="Header">
      <div className="Header-container">
        <Navbar type="horizontal">
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </Navbar>
      </div>
    </header>
  );
}
