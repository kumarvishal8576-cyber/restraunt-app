import React, { useState } from "react";

const Reservation = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // 📅 Date logic
  const today = new Date();
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const monthName = today.toLocaleString("default", { month: "long" });

  const dates = Array.from({ length: daysInMonth }, (_, i) => {
    return `${i + 1} ${monthName} ${year}`;
  });

  // 🔥 HANDLE RESERVATION (BACKEND CONNECTED)
  const handleReserve = async () => {
    if (!name || !date || !time || !guests) {
      alert("Please fill all fields ❗");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          date,
          time,
          guests,
        }),
      });

      const data = await res.json();
      console.log("Reservation saved:", data);

      // ✅ show popup
      setShowPopup(true);

      // ✅ reset form
      setName("");
      setDate("");
      setTime("");
      setGuests("");

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);

    } catch (err) {
      console.error(err);
      alert("Booking failed ❌");
    }
  };

  return (
    <section id="reservation">
      <div className="rev">

        {/* HEADER */}
        <div className="header">
          <h1>reserve your table</h1>
          <h3>experience an unforgettable evening with us</h3>
        </div>

        <div className="dropdowns">

          {/* NAME */}
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* DATE */}
          <select value={date} onChange={(e) => setDate(e.target.value)}>
            <option value="" disabled hidden>Select Date</option>

            {dates.map((d, index) => (
              <option key={index} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* TIME */}
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="" disabled hidden>Select Time</option>

            <option value="10:00 AM">10:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
          </select>

          {/* GUESTS */}
          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            <option value="" disabled hidden>Guests</option>

            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          {/* BUTTON */}
          <button onClick={handleReserve}>reserve now</button>

        </div>
      </div>

      {/* 🎉 POPUP */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>🎉 Table Booked!</h2>
            <p>Your reservation is confirmed 🍽️</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reservation;