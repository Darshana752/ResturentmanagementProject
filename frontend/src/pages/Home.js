import React from "react";
import Navbar from "../component/Navbar";
import "./home.css";
import { Link } from "react-router-dom";
import foodimage1 from "../assets/image1.jpg"; // background image
import Bottom from "../component/Bottom";

export default function Home() {
  return (
    <div className="home-page">
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

      {/* 🍽️ About Section */}
      <section className="about-section">
        <div className="about-container">
          <h2>About MD Restaurent </h2>
          <p>
            At <strong>Food Heaven</strong>, we believe that good food brings people together.
            Whether you’re craving something spicy, sweet, or savory — we deliver
            happiness right to your doorstep. Our platform connects passionate chefs
            and hungry customers with a smooth, fast, and reliable experience.
          </p>
          <p>
            We’re not just a food delivery service — we’re a community that celebrates
            taste, freshness, and convenience. Enjoy restaurant-quality dishes,
            handcrafted with love, delivered hot and fresh to your home.
          </p>
          <div className="stats">
            <div className="stat-box">
              <h3>500+</h3>
              <p>Delicious Dishes</p>
            </div>
            <div className="stat-box">
              <h3>200+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-box">
              <h3>50+</h3>
              <p>Restaurants Partnered</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🌐 Footer */}
      <Bottom />
    </div>
  );
}


