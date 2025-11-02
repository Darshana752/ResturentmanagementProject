import React from "react";
import Navbar from "../component/Navbar";
import "./home.css";
import { Link } from "react-router-dom";
import foodimage1 from "../assets/image1.jpg"; // background image

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* 🌟 Hero Section */}
      <div
        className="home-hero"
        style={{ backgroundImage: `url(${foodimage1})` }}
      >
        <div className="overlay"></div>

        <div className="hero-content">
          <h1>Welcome to Food Heaven</h1>
          <p>Where Flavor Meets Excellence!</p>

          <Link to="/fooditem" style={{ textDecoration: "none" }}>
            <button className="btn2">View Food Items</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

