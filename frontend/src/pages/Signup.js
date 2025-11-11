import React, { useState } from "react";
import Navbar from "../component/Navbar";
import "./signup.css"; // ✅ Import the CSS file
import foodimage1 from "../assets/image2.jpg";
import Bottom from "../component/Bottom";

export default function Signup() {
  const [formData, setFormData] = useState({
    role: "CUSTOMER",
    name: "",
    email: "",
    password: "",
    phone: "",
    homeNo: "",
    street: "",
    city: "",
    postalCode: "",
    post: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url =
      formData.role === "ADMIN"
        ? "http://localhost:8090/api/register/admin"
        : "http://localhost:8090/api/register/customer";

    const payload =
      formData.role === "ADMIN"
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: "ADMIN",
            post: formData.post,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: "CUSTOMER",
            homeNo: formData.homeNo,
            street: formData.street,
            city: formData.city,
            postalCode: formData.postalCode,
          };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(`${formData.role} registered successfully!`);
        setFormData({
          role: "CUSTOMER",
          name: "",
          email: "",
          password: "",
          phone: "",
          homeNo: "",
          street: "",
          city: "",
          postalCode: "",
          post: "",
        });
      } else {
        const errorData = await response.text();
        alert("Registration failed: " + errorData);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="signup-container"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${foodimage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <form onSubmit={handleSubmit} className="signup-form">
          <h2>Sign Up for our system.</h2>

          <div className="form-group">
            <label style={{color:"white"}}>Choose Role: </label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          {formData.role === "CUSTOMER" ? (
            <>
              <input
                type="text"
                name="homeNo"
                placeholder="Home No"
                value={formData.homeNo}
                onChange={handleChange}
              />
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={formData.street}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </>
          ) : (
            <input
              type="text"
              name="post"
              placeholder="Admin Post"
              value={formData.post}
              onChange={handleChange}
            />
          )}

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
       <div style={{marginTop:"-20px"}}> <Bottom/></div>
    </div>
  );
}

