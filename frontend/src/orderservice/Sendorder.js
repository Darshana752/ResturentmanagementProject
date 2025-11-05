import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import "./sendorder.css";
import foodimage1 from "../assets/image9.jpg"; // ✅ Background image

export default function SendOrder() {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [orderForm, setOrderForm] = useState({
    quantity: 1,
    deliveryAddress: "",
  });

  // ✅ Get logged-in userId from localStorage
  const userId = localStorage.getItem("userId");

  // ✅ Fetch all food items
  useEffect(() => {
    fetch("http://localhost:8090/api/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Error fetching food:", err));
  }, []);

  const handleChange = (e) => {
    setOrderForm({ ...orderForm, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFood) {
      alert("❌ Please select a food item first!");
      return;
    }

    if (!userId) {
      alert("⚠️ You must log in first before placing an order!");
      return;
    }

    const totalAmount = selectedFood.price * orderForm.quantity;

    const orderData = {
      deliveryAddress: orderForm.deliveryAddress,
      amount: totalAmount,
      status: "Pending",
      orderItems: [
        {
          food: { foodId: selectedFood.foodId },
          quantity: orderForm.quantity,
          priceAtPurchase: selectedFood.price,
        },
      ],
      customer: { userId: parseInt(userId) },
    };

    try {
      const response = await fetch("http://localhost:8090/api/orders/place", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("✅ Order placed successfully!");
        setSelectedFood(null);
        setOrderForm({ quantity: 1, deliveryAddress: "" });
      } else {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        alert("❌ Failed to place order. Check console for details.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("❌ Could not connect to the server.");
    }
  };

  const getFoodImage = (food) => {
    if (!food.image) return "/default-food.jpg";
    if (food.image.startsWith("/9j/") || food.image.startsWith("iVBORw0KGgo"))
      return `data:image/jpeg;base64,${food.image}`;
    return `http://localhost:8090/uploads/${food.image}`;
  };

  return (
    <div
      className="sendorder-body"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${foodimage1})`,
      }}
    >
      <Navbar />
      <h1 className="sendorder-title">Place Your Order 🍕</h1>

      <div className="food-grid">
        {foods.map((food) => (
          <div
            key={food.foodId}
            className={`food-card ${
              selectedFood?.foodId === food.foodId ? "expanded" : ""
            }`}
          >
            <img
              src={getFoodImage(food)}
              alt={food.name}
              className="food-img"
              onError={(e) => (e.target.src = "/default-food.jpg")}
            />
            <h2 className="food-name">{food.name}</h2>
            <p className="food-category">{food.category}</p>
            <p className="food-ingredients">{food.ingredients}</p>
            <p className="food-price">Rs. {food.price.toFixed(2)}</p>

            <button
              className="order-btn"
              onClick={() =>
                setSelectedFood(
                  selectedFood?.foodId === food.foodId ? null : food
                )
              }
            >
              {selectedFood?.foodId === food.foodId ? "Cancel" : "Send Order"}
            </button>

            {selectedFood?.foodId === food.foodId && (
              <form className="order-form" onSubmit={handleOrderSubmit}>
                <h3>Order Details</h3>

                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={orderForm.quantity}
                  min="1"
                  onChange={handleChange}
                  required
                />

                <label>Delivery Address:</label>
                <textarea
                  name="deliveryAddress"
                  value={orderForm.deliveryAddress}
                  onChange={handleChange}
                  required
                ></textarea>

                <p className="total-price">
                  <strong>Total:</strong> Rs.{" "}
                  {(selectedFood.price * orderForm.quantity).toFixed(2)}
                </p>

                <button type="submit" className="submit-btn">
                  Confirm Order
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}




