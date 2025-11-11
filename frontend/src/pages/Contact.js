import React from "react";
import Navbar from "../component/Navbar";
import "./contact.css";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import bgImage from "../assets/image12.jpg";
import Bottom from "../component/Bottom";

export default function Contact() {
  return (
    <div> <Navbar />
    <div
      className="contact-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
    

      {/* 🌟 Hero Section */}
      <div className="contact-hero">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">
          I’d love to hear from you! Whether you have a project idea, want to
          collaborate, or just say hello.
        </p>
      </div>

      {/* 💬 Contact Info Section */}
      <div className="contact-container">
        <div className="contact-card">
          <FaEnvelope className="contact-icon" />
          <h3>Email</h3>
          <a href="mailto:malithbotheju9@gmail.com" className="contact-link">
            malithbotheju9@gmail.com
          </a>
        </div>

        <div className="contact-card">
          <FaLinkedin className="contact-icon" />
          <h3>LinkedIn</h3>
          <a
            href="https://www.linkedin.com/in/malith-botheju-305719363/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            linkedin.com/in/malith-botheju
          </a>
        </div>

        <div className="contact-card">
          <FaGithub className="contact-icon" />
          <h3>GitHub</h3>
          <a
            href="https://github.com/Darshana752/ResturentmanagementProject.git"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            github.com/Darshana752
          </a>
        </div>
      </div>

      {/* 🌈 Footer */}
      <footer className="contact-footer">
        <p>© {new Date().getFullYear()} Malith Botheju. All rights reserved.</p>
      </footer>
      <Bottom />
    </div>
    
    </div>
     
    
  );
}

