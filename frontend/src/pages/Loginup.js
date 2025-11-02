// Loginup.jsx
import React, { useState } from "react";
import Navbar from "../component/Navbar";
import "./loginup.css";
import foodimage1 from "../assets/image3.jpg";

export default function Loginup() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8090/api/register/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Login successful! Role: ${data.role}`);
        if (data.role === "ADMIN") {
          window.location.href = "/admindashboard";
        } else {
          window.location.href = "/customerdashboard";
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="loginup-background"
        style={{ backgroundImage: `url(${foodimage1})` }}
      >
        <div className="loginup-container">
          <div className="card">
            <h2 className="card-title">Login</h2>
            <form className="form" onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

