import React from "react";
import Navbar from "../component/Navbar";
import "./customerdashboard.css";
import { useNavigate } from "react-router-dom";
import foodimage1 from "../assets/image8.jpg";
import Bottom from "../component/Bottom";

export default function Customerdashboard() {
  const navigate = useNavigate();

  const handleMyOrders = () => {
    navigate("/myorders");
  };

  const handleSendOrder = () => {
    navigate("/sendorder");
  };

  return (

    <div><div
      className="dashboard-body"
      style={{ backgroundImage: `url(${foodimage1})` }}
    >
      <div className="overlay"></div>
      <Navbar />

      <div className="dashboard-container">
        <h1 className="dashboard-title">Welcome to MD RESTAURENT.</h1>
        <p className="dashboard-subtitle">
          You can send your orders and veiw your order details.🍽️
        </p>

        <div className="card-wrapper">
          {/* My Orders Card */}
          <div className="dashboard-card" onClick={handleMyOrders}>
            <div className="card-icon">📦</div>
            <h2 className="card-title">My Orders</h2>
            <p className="card-description">
              View your previous and current orders, track delivery, and reorder quickly.
            </p>
            <button className="card-btn">View Orders</button>
          </div>

          {/* Send Your Order Card */}
          <div className="dashboard-card" onClick={handleSendOrder}>
            <div className="card-icon">🛒</div>
            <h2 className="card-title">Send Your Order</h2>
            <p className="card-description">
              Place a new order and enjoy your favorite food from our menu today!
            </p>
            <button className="card-btn">Order Now</button>
          </div>
        </div>
      </div>
      
    </div>
    <div style={{marginTop:"-50px"}}> <Bottom/></div>
    </div>
    
  );
}
