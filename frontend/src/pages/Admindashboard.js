import React from "react";
import Navbar from "../component/Navbar";
import "./admindashboard.css";
import { FaBoxOpen, FaClipboardList } from "react-icons/fa";
import foodimage1 from "../assets/image4.jpg";
import { Link } from "react-router-dom";
export default function Admindashboard() {
  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <h1 className="dashboard-title"><h1><b>WELCOME</b></h1>Admin Dashboard</h1>
        <div className="dashboard-cards">
          <div className="card-item" onClick={() => (window.location.href = "/addfoodproduct")}>
            <FaBoxOpen className="icon" />
            <h2>Add Food Item</h2>
            <p>Add new food items.  </p>
          </div>

          

           <div className="card-item" onClick={() => (window.location.href = "/updatefooditem")}>
            <FaBoxOpen className="icon" />
            <h2>Update Food Item</h2>
            <p>update existing ones in your restaurant menu.</p>
          </div>

          <div className="card-item" onClick={() => (window.location.href = "/getorder")}>
            <FaClipboardList className="icon" />
            <h2>Get Orders</h2>
            <p>View and manage all customer orders in real time.</p>
          </div>
        </div>
      </div>
    </>
  );
}
