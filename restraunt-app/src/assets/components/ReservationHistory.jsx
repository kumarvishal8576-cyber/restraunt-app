import React, { useEffect, useState } from "react";

const ReservationHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/reservations")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
        <br></br>
         <br></br>
          <br></br>
           <br></br>
      <h1>📅 Your Reservations</h1>

      {data.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        data.map((item, index) => (
          <div key={index} style={{ margin: "10px 0", border: "1px solid gold", padding: "10px" }}>
            <p><b>Name:</b> {item.name}</p>
            <p><b>Date:</b> {item.date}</p>
            <p><b>Time:</b> {item.time}</p>
            <p><b>Guests:</b> {item.guests}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ReservationHistory;