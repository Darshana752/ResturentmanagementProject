import React from "react";
import Navbar from "../component/Navbar";
import "./admindashboard.css";
import { FaBoxOpen, FaClipboardList } from "react-icons/fa";
import foodimage1 from "../assets/image4.jpg";

export default function Admindashboard() {
  return (
    <>
      <Navbar />
      <div className="admin-dashboard">
        <h1 className="dashboard-title"><h1><b>WELCOME</b></h1>Admin Dashboard</h1>
        <div className="dashboard-cards">
          <div className="card-item" onClick={() => (window.location.href = "/addproduct")}>
            <FaBoxOpen className="icon" />
            <h2>Add Product</h2>
            <p>Add new food items or update existing ones in your restaurant menu.</p>
          </div>

          <div className="card-item" onClick={() => (window.location.href = "/orders")}>
            <FaClipboardList className="icon" />
            <h2>Get Orders</h2>
            <p>View and manage all customer orders in real time.</p>
          </div>
        </div>
      </div>
    </>
  );
}
