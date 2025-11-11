import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import "./updatefooditem.css";
import Bottom from "../component/Bottom";
export default function UpdateFooditem() {
  const [foods, setFoods] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formStates, setFormStates] = useState({}); // 👈 store form per foodId

  useEffect(() => {
    fetch("http://localhost:8090/api/foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        const initialForms = {};
        data.forEach((food) => {
          initialForms[food.foodId] = {
            name: food.name,
            price: food.price,
            category: food.category,
            ingredient: food.ingredient,
            description: food.description,
            image: null,
          };
        });
        setFormStates(initialForms);
      })
      .catch((err) => console.error("Error fetching foods:", err));
  }, []);

  const handleEditClick = (food) => {
    if (editId === food.foodId) {
      setEditId(null);
    } else {
      setEditId(food.foodId);
    }
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setFormStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], [name]: value },
    }));
  };

  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    setFormStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], image: file },
    }));
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const formData = formStates[id];
    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("price", formData.price);
    updatedData.append("category", formData.category);
    updatedData.append("ingredient", formData.ingredient);
    updatedData.append("description", formData.description);
    if (formData.image) updatedData.append("image", formData.image);

    const response = await fetch(`http://localhost:8090/api/foods/${id}`, {
      method: "PUT",
      body: updatedData,
    });

    if (response.ok) {
      alert("✅ Food updated successfully!");
      const refreshed = await fetch("http://localhost:8090/api/foods").then((r) =>
        r.json()
      );
      setFoods(refreshed);
      setEditId(null);
    } else {
      alert("❌ Failed to update food!");
    }
  };

  return (
    <div><div>
      <Navbar />
      <div className="update-page">
        <h1 className="update-title">🍽 Manage & Update Food Items</h1>

        <div className="food-grid">
          {foods.map((food) => (
            <div key={food.foodId} className="food-card">
              <img
                src={`http://localhost:8090/uploads/${food.image}`}
                alt={food.name}
                className="food-image"
              />
              <div className="food-info">
                <h3>{food.name}</h3>
                <p>Category: {food.category}</p>
                <p>Ingredients: {food.ingredient}</p>
                <p>Price: Rs. {food.price}.00</p>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(food)}
                >
                  ✏️ {editId === food.foodId ? "Cancel" : "Update"}
                </button>
              </div>

              {/* ✅ Only the clicked card shows its update form */}
              {editId === food.foodId && (
                <div className="update-form-container">
                  <form onSubmit={(e) => handleSubmit(e, food.foodId)}>
                    <input
                      type="text"
                      name="name"
                      value={formStates[food.foodId]?.name || ""}
                      onChange={(e) => handleChange(e, food.foodId)}
                      placeholder="Food Name"
                      required
                    />
                    <input
                      type="number"
                      name="price"
                      value={formStates[food.foodId]?.price || ""}
                      onChange={(e) => handleChange(e, food.foodId)}
                      placeholder="Price"
                      required
                    />
                    <input
                      type="text"
                      name="category"
                      value={formStates[food.foodId]?.category || ""}
                      onChange={(e) => handleChange(e, food.foodId)}
                      placeholder="Category"
                      required
                    />
                    <input
                      type="text"
                      name="ingredient"
                      value={formStates[food.foodId]?.ingredient || ""}
                      onChange={(e) => handleChange(e, food.foodId)}
                      placeholder="Ingredients"
                      required
                    />
                    <textarea
                      name="description"
                      value={formStates[food.foodId]?.description || ""}
                      onChange={(e) => handleChange(e, food.foodId)}
                      placeholder="Description"
                      rows="2"
                    ></textarea>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, food.foodId)}
                    />
                    <button type="submit" className="save-btn">
                      💾 Save Changes
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
     <div style={{marginTop:"-50px"}}> <Bottom/></div></div>
  );
}

