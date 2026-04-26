import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
  const cart = state?.cart || [];

  const [method, setMethod] = useState("UPI");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  

  //  NEW STATES
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal - discount;

  //  COUPON
  const applyPromo = () => {
    if (promo === "SAVE50") {
      setDiscount(50);
    } else {
      alert("Invalid Coupon ❌");
    }
  };

  const handlePayment = () => {
  if (cart.length === 0) return;

  if (method === "UPI" && upiId.trim() === "") {
    alert("Enter UPI ID ❗");
    return;
  }

  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    setSuccess(true);

    // ⏳ popup ke baad reset
    setTimeout(() => {
      setSuccess(false);

      // 🔥 RESET EVERYTHING
      setUpiId("");
      setPromo("");
      setDiscount(0);
      setMethod("UPI");

    }, 2000);

  }, 2000);
};

 

  return (
    <div className="payment-container">

      <h1>💳 Payment</h1>

      {/*  ORDER SUMMARY */}
      <div className="summary">
        <h3>Order Summary</h3>

        {cart.map((item) => (
          <div key={item.id} className="summary-item">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <div className="summary-total">
          <h2>Total: ₹{total}</h2>
        </div>
      </div>

      {/*  MAIN LAYOUT */}
      <div className="payment-layout">

        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE */}
        <div className="payment-details">

          {/*  UPI SECTION */}
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

              {/* UPI INPUT */}
              <div className="upi-input">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. name@upi)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            </>
          )}

          {/* CARD FORM */}
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
          {method === "Cash" && (
            <p>Pay at delivery 🚚</p>
          )}

          {/*  PROMO */}
          <div className="promo">
            <input
              type="text"
              placeholder="Enter Coupon Code if any"
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
            />
            <button onClick={applyPromo}>Apply</button>
          </div>

          {/* 💳 PAY BUTTON */}
          <button className="pay-btn" onClick={handlePayment}>
            {loading ? "Processing..." : `Pay ₹${total}`}
          </button>

        </div>
      </div>

      {/*  SUCCESS POPUP */}
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