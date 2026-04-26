import React from "react";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="food">
        <img
          src="https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg?semt=ais_hybrid&w=740&q=80" alt=""
        />
        <h1>discover our menu</h1>

        <button className="btn" onClick={() => navigate("/menu")}>
          view menu
        </button>
      </div>
    </div>
  );
};

export default Card;