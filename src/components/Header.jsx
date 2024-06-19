import React from "react";
import { Link } from "react-router-dom";
import "../components-css/Header.css";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header-link">
        <div className="header-content">
          <p className="header-text">
            So much to read, which article to choose? You'll never get bored
            browsing...
          </p>
          <h1 className="header-title">NC-NEWS</h1>
        </div>
      </Link>
    </header>
  );
};

export default Header;
