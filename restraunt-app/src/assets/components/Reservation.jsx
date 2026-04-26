import React, { useState } from "react";

const Reservation = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // date logic
  const today = new Date();
  const year = today.getFullYear();
  const monthIndex = today.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const monthName = today.toLocaleString("default", { month: "long" });

  const dates = Array.from({ length: daysInMonth }, (_, i) => {
    return `${i + 1} ${monthName} ${year}`;
  });

  // 🔥 HANDLE RESERVE
  const handleReserve = () => {
    if (!date || !time || !guests) {
      alert("Please select all fields ❗");
      return;
    }

    setShowPopup(true);

    // 🔥 RESET AFTER BOOKING
    setDate("");
    setTime("");
    setGuests("");

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <section id="reservation">
      <div className="rev">

        <div className="header">
          <h1>reserve your table</h1>
          <h3>experience an unforgettable evening with us</h3>
        </div>

        <div className="dropdowns">

          {/* DATE */}
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
          >
            <option value="" disabled hidden>Select Date</option>

            {dates.map((d, index) => (
              <option key={index} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* TIME */}
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="" disabled hidden>Select Time</option>

            <option value="10:00 AM">10:00 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="7:00 PM">7:00 PM</option>
          </select>

          {/* GUESTS */}
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="" disabled hidden>Guests</option>

            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <button onClick={handleReserve}>reserve now</button>

        </div>
      </div>

      {/* POPUP */}
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