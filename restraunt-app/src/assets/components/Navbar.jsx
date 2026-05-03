import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>

          <li><Link to="/#about">About</Link></li>
          <li><Link to="/#reservation">Reservation</Link></li>
          <li>
            <Link to="/history" className="history-btn">
              Reservation History
            </Link>
          </li>
           <div className="nav-right">
             <Link to="/login">
             <button className="signin-btn">Sign In</button>
             </Link>
           </div>
        </ul>
      </div>
    </div>
  )
}

export default Navbar