import React, { useState } from "react";

const Reservation = () => {

  const [date, setDate] = useState("");

  // current month & year
  const today = new Date();
const year = today.getFullYear();
const monthIndex = today.getMonth(); // 0–11

// total days in current month
const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

const monthName = today.toLocaleString("default", { month: "long" });

const dates = Array.from({ length: daysInMonth }, (_, i) => {
  return `${i + 1} ${monthName} ${year}`;


    
  });

  return (
    <div>
      <div className="rev">

        <div className="header">
          <h1>reserve your table</h1>
          <h3>experience an unforgettable evening with us</h3>
        </div>

        <div className="dropdowns">

    
          <select
            className="dropdown1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          >
            <option>Select Date</option>

            {dates.map((d, index) => (
              <option key={index} value={d}>
                {d}
              </option>
            ))}
          </select>

  
          <select className="dropdown2">
            <option>Select time</option>
            <option>10:00 AM</option>
            <option>12:00 PM</option>
            <option>3:00 PM</option>
            <option>7:00 PM</option>
          </select>

          
          <select className="dropdown3">
            <option>Guests</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>

          <button>reserve now</button>

        </div>
      </div>
    </div>
  );
};

export default Reservation;