import React, { useState } from "react";
import Navbar from "../component/Navbar";
import "./addproduct.css";
import foodimage1 from "../assets/image6.jpg"; // background image

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    ingredient: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const response = await fetch("http://localhost:8090/api/foods/add", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setMessage("✅ Product added successfully!");
        setFormData({
          name: "",
          price: "",
          category: "",
          ingredient: "",
          description: "",
          image: null,
        });
        setPreview(null);
      } else {
        setMessage("❌ Failed to add product. Try again!");
      }
    } catch (error) {
      setMessage("⚠️ Error: " + error.message);
    }
  };

  return (
    <div
      className="add-product-page"
      style={{
        backgroundImage: `url(${foodimage1})`,
      }}
    >
      <Navbar />

      <div className="add-product-container">
        <form className="add-product-form" onSubmit={handleSubmit}>
          <h2 className="form-title">🍽 Add New Food Item</h2>

          <input
            type="text"
            name="name"
            placeholder="Enter food name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
          />

          <textarea
            name="ingredient"
            placeholder="Enter ingredients"
            value={formData.ingredient}
            onChange={handleChange}
          ></textarea>

          <textarea
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <label className="file-label">
            Upload Image:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}

          <button type="submit" className="submit-btn">
            Add Product
          </button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
