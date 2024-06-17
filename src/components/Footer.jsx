import React from "react";
import "../components-css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="scroll-top-button"
      >
        Back to Top
      </button>
    </footer>
  );
};

export default Footer;
