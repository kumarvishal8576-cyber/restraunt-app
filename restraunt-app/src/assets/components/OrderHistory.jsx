import React, { useEffect, useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then(res => res.json())
      .then(data => {
        console.log("🔥 Orders:", data);
        setOrders(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>🧾 Your Orders</h1>

      {/* DEBUG (remove later) */}
      <pre>{JSON.stringify(orders, null, 2)}</pre>

      {orders && orders.length > 0 ? (
        orders.map((order, i) => (
          <div
            key={i}
            style={{
              border: "1px solid gold",
              margin: "10px",
              padding: "10px",
              borderRadius: "10px"
            }}
          >
            <p><b>Total:</b> ₹{order.total}</p>
            <p><b>Status:</b> {order.status}</p>

            {/* 🔥 SAFE RENDER */}
            {order.items?.map((item, idx) => (
              <p key={idx}>
                {item.name} × {item.quantity} = ₹{item.price * item.quantity}
              </p>
            ))}
          </div>
        ))
      ) : (
        <p>No orders yet</p>
      )}
    </div>
  );
};

export default OrderHistory;