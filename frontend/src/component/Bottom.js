import React from "react";
import { FaGithub, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./bottom.css";

export default function Bottom() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left side - Logo / Site name */}
        <div className="footer-left">
          <h2 className="footer-logo">FoodExpress</h2>
          <p>Delivering happiness to your doorstep 🍔🚚</p>
        </div>

        {/* Middle - Social Media Links */}
        <div className="footer-social">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </div>

        {/* Right - Contact / Copyright */}
        <div className="footer-right">
          <p>
            Contact us: <a href="mailto:info@foodexpress.com">info@foodexpress.com</a>
          </p>
          <p>© {new Date().getFullYear()} FoodExpress. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
