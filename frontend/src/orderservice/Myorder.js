import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import "./myorder.css";
import bgImage from "../assets/image11.jpg";
import Bottom from "../component/Bottom";

export default function Myorder() {
  const [orders, setOrders] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState({});
  const [deliveryData, setDeliveryData] = useState({});

  const customerId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrdersAndDeliveries = async () => {
      try {
        const ordersRes = await fetch("http://localhost:8090/api/orders");
        const ordersData = await ordersRes.json();

        const deliveriesRes = await fetch("http://localhost:8090/api/deliver");
        const deliveriesData = await deliveriesRes.json();

        const customerOrders = ordersData.filter(
          (order) => order.customer?.userId?.toString() === customerId
        );

        setOrders(customerOrders);
        setDeliveries(deliveriesData);
      } catch (err) {
        console.error("Error fetching orders or deliveries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndDeliveries();
  }, [customerId]);

  // ✅ Sort orders: Pending → Ready → Delivered
  const sortedOrders = [...orders].sort((a, b) => {
    const order = ["Pending", "Ready", "Delivered"];
    return order.indexOf(a.status) - order.indexOf(b.status);
  });

  // Find delivery for an order
  const getDeliveryForOrder = (orderId) =>
    deliveries.find((d) => d.orderId?.toString() === orderId?.toString());

  // Mark order as Ready
  const handleMyOrderClick = async (order) => {
    try {
      const res = await fetch(
        `http://localhost:8090/api/orders/${order.orderId}/status?status=Ready`,
        { method: "PUT" }
      );

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o.orderId === order.orderId ? { ...o, status: "Ready" } : o
          )
        );
        setShowForm({ ...showForm, [order.orderId]: true });
      } else {
        alert("❌ Failed to update order status.");
      }
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  // Form change handler
  const handleFormChange = (orderId, e) => {
    setDeliveryData({
      ...deliveryData,
      [orderId]: { ...deliveryData[orderId], [e.target.name]: e.target.value },
    });
  };

  // Submit delivery details
  const handleDeliverySubmit = async (orderId) => {
    try {
      const data = {
        ...deliveryData[orderId],
        orderId: orderId,
        userId: customerId, // ✅ include userId (required by backend)
      };

      const res = await fetch("http://localhost:8090/api/deliver", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const newDelivery = await res.json();
        setDeliveries((prev) => [...prev, newDelivery]);
        setShowForm({ ...showForm, [orderId]: false });
        alert("✅ Delivery details added!");
      } else {
        alert("❌ Failed to add delivery details.");
      }
    } catch (err) {
      console.error("Error adding delivery:", err);
    }
  };

  // Confirm delivery received
  const handleGotDeliveryClick = async (order) => {
    try {
      const res = await fetch(
        `http://localhost:8090/api/orders/${order.orderId}/status?status=Delivered`,
        { method: "PUT" }
      );

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o.orderId === order.orderId ? { ...o, status: "Delivered" } : o
          )
        );
        alert("🎉 You confirmed the delivery!");
      } else {
        alert("❌ Failed to update delivery status.");
      }
    } catch (err) {
      console.error("Error updating delivery:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="admin-order-page"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="overlay"></div>
        <h2 className="page-title">📝 My Orders</h2>

        {loading ? (
          <p className="loading">Loading your orders...</p>
        ) : sortedOrders.length === 0 ? (
          <p className="no-orders">You have no orders yet.</p>
        ) : (
          <div className="admin-order-container">
            {sortedOrders.map((order) => {
              const delivery = getDeliveryForOrder(order.orderId);
              return (
                <div
                  key={order.orderId}
                  className={`admin-order-card ${
                    order.status === "Delivered" ? "delivered" : ""
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
                    <p>
                      <strong>Date:</strong>{" "}
                      {order.date
                        ? new Date(order.date).toLocaleString()
                        : "N/A"}
                    </p>
                    <p>
                      <strong>Delivery Address:</strong>{" "}
                      {order.deliveryAddress || "N/A"}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> Rs.{" "}
                      {order.amount?.toFixed(2) || "0.00"}
                    </p>
                    <p>
                      <strong>Customer ID:</strong> {order.customer?.userId}
                    </p>
                  </div>

                  <div className="order-items">
                    <h4>🛒 Items:</h4>
                    <ul>
                      {order.orderItems?.length > 0 ? (
                        order.orderItems.map((item) => (
                          <li key={item.orderItemId}>
                            {item.food?.name || "Unknown Food"} ×{" "}
                            {item.quantity} — Rs.{" "}
                            {(item.quantity * item.priceAtPurchase).toFixed(2)}
                          </li>
                        ))
                      ) : (
                        <li>No items</li>
                      )}
                    </ul>
                  </div>

                  {/* ✅ Show delivery details */}
                  {(order.status === "Ready" || order.status === "Delivered") &&
                    delivery && (
                      <div className="delivery-details">
                        <h4>🚚 Delivery Details:</h4>
                        <p>
                          <strong>Person:</strong> {delivery.deliveryPerson}
                        </p>
                        <p>
                          <strong>Phone:</strong> {delivery.contactNo}
                        </p>
                        <p>
                          <strong>Vehicle:</strong> {delivery.vehicleNo}
                        </p>

                        {order.status === "Ready" && (
                          <button
                            className="got-delivery-btn"
                            onClick={() => handleGotDeliveryClick(order)}
                          >
                            I Got Delivery
                          </button>
                        )}
                      </div>
                    )}

                  {/* "My Order" button */}
                  {order.status !== "Ready" &&
                    order.status !== "Delivered" &&
                    !showForm[order.orderId] && (
                      <button
                        className="ready-btn"
                        onClick={() => handleMyOrderClick(order)}
                      >
                        My Order
                      </button>
                    )}

                  {/* Delivery Form */}
                  {showForm[order.orderId] && (
                    <div className="delivery-form">
                      <h4>Enter Delivery Details:</h4>
                      <input
                        type="text"
                        name="deliveryPerson"
                        placeholder="Delivery Person Name"
                        value={
                          deliveryData[order.orderId]?.deliveryPerson || ""
                        }
                        onChange={(e) => handleFormChange(order.orderId, e)}
                      />
                      <input
                        type="text"
                        name="contactNo"
                        placeholder="Contact No"
                        value={deliveryData[order.orderId]?.contactNo || ""}
                        onChange={(e) => handleFormChange(order.orderId, e)}
                      />
                      <input
                        type="text"
                        name="vehicleNo"
                        placeholder="Vehicle No"
                        value={deliveryData[order.orderId]?.vehicleNo || ""}
                        onChange={(e) => handleFormChange(order.orderId, e)}
                      />
                      <button
                        className="submit-delivery-btn "
                        onClick={() => handleDeliverySubmit(order.orderId)}
                      >
                        Submit Delivery
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div style={{marginTop:"-50px"}}> <Bottom/></div>
    </>
  );
}


