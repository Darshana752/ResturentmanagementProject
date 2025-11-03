import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import "./fooditem.css";
import foodimage1 from "../assets/image5.jpg"; // background image

export default function Fooditem() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    // Fetch food items from backend
    fetch("http://localhost:8090/api/foods")
      .then((response) => response.json())
      .then((data) => setFoods(data))
      .catch((error) => console.error("Error fetching foods:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <div
        className="food-page"
        style={{
          backgroundImage: `url(${foodimage1})`,
        }}
      >
        <div className="overlay">
          <h1 className="food-title">🍽 Our Delicious Menu <p style={{fontSize:'50%'}}>If you want to enjoy our meals, please sign up on our page.</p></h1>
          <div className="food-grid">
            {foods.length === 0 ? (
              <p className="loading-text">No food items found.</p>
            ) : (
              foods.map((food) => (
                <div className="food-card" key={food.foodId}>
                  <div className="food-image-container">
                    <img
                      src={`http://localhost:8090/${food.image}`}
                      alt={food.name}
                      className="food-image"
                    />
                  </div>
                  <div className="food-info">
                    <h2 className="food-name">{food.name}</h2>
                    <p className="food-category">
                      <b>Category:</b> {food.category}
                    </p>
                    <p className="food-ingredient">
                      <b>Ingredients:</b> {food.ingredient}
                    </p>
                    <p className="food-price">Rs. {food.price}.00</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
