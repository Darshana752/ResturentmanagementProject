import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import "./getorder.css";
import bgImage from "../assets/image10.jpg";
import Bottom from "../component/Bottom";
export default function Getorder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    deliveryPerson: "",
    contactNo: "",
    vehicleNo: "",
    orderId: "",
    userId: "",
  });

  // ✅ Fetch all orders
  useEffect(() => {
    fetch("http://localhost:8090/api/orders")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        // ✅ Sort orders: Delivered ones go to bottom
        const sortedOrders = data.sort((a, b) => {
          if (a.status === "Delivered" && b.status !== "Delivered") return 1;
          if (a.status !== "Delivered" && b.status === "Delivered") return -1;
          return 0;
        });
        setOrders(sortedOrders);
      })
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Open modal with auto-filled data
  const openDeliveryForm = (order) => {
    setDeliveryData({
      deliveryPerson: "",
      contactNo: "",
      vehicleNo: "",
      orderId: order.orderId,
      userId: order.customer?.userId || "",
    });
    setShowModal(true);
  };

  // Handle form input change
  const handleDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value });
  };

  // ✅ Submit delivery data
  const submitDelivery = async () => {
    const { deliveryPerson, contactNo, vehicleNo, orderId, userId } = deliveryData;

    if (!deliveryPerson) {
      alert("Please enter the Delivery Person name!");
      return;
    }

    try {
      const payload = {
        deliveryPerson,
        contactNo: contactNo || "",
        vehicleNo: vehicleNo || "",
        orderId: parseInt(orderId),
        userId: parseInt(userId),
      };

      const res = await fetch("http://localhost:8090/api/deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to create delivery: ${errorText}`);
      }

      // ✅ Update order status to Ready
      const resOrder = await fetch(
        `http://localhost:8090/api/orders/${orderId}/status?status=Ready`,
        { method: "PUT" }
      );

      if (!resOrder.ok) {
        const errorText = await resOrder.text();
        throw new Error(`Failed to update order status: ${errorText}`);
      }

      // ✅ Update frontend state + re-sort
      setOrders((prev) => {
        const updated = prev.map((o) =>
          o.orderId === orderId ? { ...o, status: "Ready" } : o
        );
        return updated.sort((a, b) => {
          if (a.status === "Delivered" && b.status !== "Delivered") return 1;
          if (a.status !== "Delivered" && b.status === "Delivered") return -1;
          return 0;
        });
      });

      alert("✅ Delivery added and order marked as Ready!");
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert(`❌ Something went wrong: ${err.message}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-order-page" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="overlay"></div>
        <h2 className="page-title">📦 All Customer Orders</h2>

        {loading ? (
          <p className="loading">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="no-orders">No orders available</p>
        ) : (
          <div className="admin-order-container">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className={`admin-order-card ${
                  order.status === "Delivered" ? "delivered-card" : ""
                }`}
              >
                <div className="order-header">
                  <h3>Order #{order.orderId}</h3>
                  <span
                    className={`order-status ${
                      order.status === "Ready"
                        ? "ready"
                        : order.status === "Delivered"
                        ? "delivered"
                        : "pending"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-details">
                  <p><strong>Customer:</strong> {order.customer?.name || "Unknown"}</p>
                  <p><strong>Customer ID:</strong> {order.customer?.userId || "N/A"}</p>
                  <p><strong>Phone:</strong> {order.customer?.phone || "N/A"}</p>
                  <p><strong>Date:</strong> {order.date ? new Date(order.date).toLocaleString() : "N/A"}</p>
                  <p><strong>Delivery Address:</strong> {order.deliveryAddress || "N/A"}</p>
                  <p><strong>Total Amount:</strong> Rs. {order.amount?.toFixed(2) || "0.00"}</p>
                </div>

                <div className="order-items">
                  <h4>🛒 Items:</h4>
                  <ul>
                    {order.orderItems?.length > 0 ? (
                      order.orderItems.map((item) => (
                        <li key={item.orderItemId}>
                          {item.food?.name || item.foodName || "Unknown Food"} × {item.quantity} — Rs.{" "}
                          {(item.quantity * item.priceAtPurchase).toFixed(2)}
                        </li>
                      ))
                    ) : (
                      <li>No items</li>
                    )}
                  </ul>
                </div>

                {/* ✅ Show button only if NOT Delivered */}
                {order.status !== "Delivered" && order.status !== "Ready" && (
                  <button className="ready-btn" onClick={() => openDeliveryForm(order)}>
                    Add Delivery
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ✅ Delivery Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Add Delivery Details</h3>
              <input
                type="text"
                name="deliveryPerson"
                placeholder="Delivery Person Name"
                value={deliveryData.deliveryPerson}
                onChange={handleDeliveryChange}
              />
              <input
                type="text"
                name="contactNo"
                placeholder="Contact Number"
                value={deliveryData.contactNo}
                onChange={handleDeliveryChange}
              />
              <input
                type="text"
                name="vehicleNo"
                placeholder="Vehicle Number"
                value={deliveryData.vehicleNo}
                onChange={handleDeliveryChange}
              />
              <input
                type="text"
                name="orderId"
                placeholder="Order ID"
                value={deliveryData.orderId}
                readOnly
              />
              <input
                type="text"
                name="userId"
                placeholder="Customer ID"
                value={deliveryData.userId}
                readOnly
              />
              <div className="modal-buttons">
                <button onClick={submitDelivery}>Submit</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
       <div style={{marginTop:"-50px"}}> <Bottom/></div>
    </>
  );
}



