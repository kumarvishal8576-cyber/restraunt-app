import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="nav">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li> <Link to="/menu">Menu</Link></li>
            
            <li>
           <Link to="/#about">about</Link>
           </li>
            <li><Link to="/#reservation">Reservation</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
