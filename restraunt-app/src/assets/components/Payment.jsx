import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./payment.css";

import gpay from "../payments/gpay.png";
import paytm from "../payments/paytm.png";
import phonepe from "../payments/phonepe.png";
import bhim from "../payments/bhim.png";
import paypal from "../payments/paypal.png";

const upiApps = [
  { name: "GPay", img: gpay },
  { name: "Paytm", img: paytm },
  { name: "PhonePe", img: phonepe },
  { name: "BHIM", img: bhim },
  { name: "PayPal", img: paypal },
];

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cart = state?.cart || [];

  const [method, setMethod] = useState("UPI");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 🧮 TOTAL
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal - discount;

  // 🎟️ COUPON
  const applyPromo = () => {
    if (promo === "SAVE50") {
      setDiscount(50);
    } else {
      alert("Invalid Coupon ❌");
    }
  };

  // 🔥 PAYMENT + BACKEND
  const handlePayment = async () => {
    if (cart.length === 0) {
      alert("Cart is empty ❗");
      return;
    }

    if (method === "UPI" && upiId.trim() === "") {
      alert("Enter UPI ID ❗");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          total,
          paymentMethod: method,
          status: "paid",
          createdAt: new Date(),
        }),
      });

      const data = await res.json();
      console.log("Order Saved:", data);

      if (!res.ok) throw new Error(data.message);

      // ✅ SUCCESS
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);

        // RESET
        setUpiId("");
        setPromo("");
        setDiscount(0);
        setMethod("UPI");

      }, 2000);

    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Payment failed ❌");
    }
  };

  return (
    <div className="payment-container">

      <h1>💳 Payment</h1>

      {/* 🧾 ORDER SUMMARY */}
      <div className="summary">
        <h3>Order Summary</h3>

        {cart.map((item, index) => (
          <div key={index} className="summary-item">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <div className="summary-total">
          <h2>Total: ₹{total}</h2>
        </div>
      </div>

      <div className="payment-layout">

        {/* LEFT */}
        <div className="payment-methods">
          {["UPI", "Card", "Debit Card", "Credit Card", "Cash"].map((m) => (
            <div
              key={m}
              className={`method ${method === m ? "active" : ""}`}
              onClick={() => setMethod(m)}
            >
              {m}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="payment-details">

          {/* UPI */}
          {method === "UPI" && (
            <>
              <div className="upi-options">
                <h3>Select UPI App</h3>

                <div className="upi-grid">
                  {upiApps.map((app, index) => (
                    <div key={index} className="upi-item">
                      <img src={app.img} alt={app.name} />
                      <span>{app.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="upi-input">
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            </>
          )}

          {/* CARD */}
          {(method === "Card" || method === "Debit Card" || method === "Credit Card") && (
            <div className="card-form">
              <input type="text" placeholder="Card Number" />
              <input type="text" placeholder="Card Holder Name" />
              <div className="row">
                <input type="text" placeholder="MM/YY" />
                <input type="text" placeholder="CVV" />
              </div>
            </div>
          )}

          {/* CASH */}
          {method === "Cash" && <p>Pay at delivery 🚚</p>}

          {/* COUPON */}
          <div className="promo">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button onClick={applyPromo}>Apply</button>
          </div>

          {/* PAY */}
          <button className="pay-btn" onClick={handlePayment}>
            {loading ? "Processing..." : `Pay ₹${total}`}
          </button>

          {/* 🔥 ORDER HISTORY BUTTON */}
          <button
            className="history-page-btn"
            onClick={() => {
              navigate("/orders");
              window.scrollTo(0, 0);
            }}
          >
            View Order History 📜
          </button>

        </div>
      </div>

      {/* SUCCESS */}
      {success && (
        <div className="popup">
          <div className="popup-content">
            <h2>🎉 Payment Successful</h2>
            <p>Your Order has been placed 🍽️</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default Payment;