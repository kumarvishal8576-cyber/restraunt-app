import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./assets/components/Navbar";
import Hero from "./assets/components/Hero";
import About from "./assets/components/About";
import MenuSection from "./assets/components/MenuSection";
import Reservation from "./assets/components/Reservation";

import Menu from "./assets/components/Menu";
import Payment from "./assets/components/Payment";
import ReservationHistory from "./assets/components/ReservationHistory";
import OrderHistory from "./assets/components/OrderHistory";
import Login from "./assets/components/Login";


//  Scroll Handler
const ScrollToSection = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
};

//  Home Page
const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <MenuSection />
      <Reservation />
    </>
  );
};

//  MAIN APP
const App = () => {
  return (
    <BrowserRouter>

      {/* Scroll logic */}
      <ScrollToSection />

      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/history" element={<ReservationHistory />} />

        {/*   Order History Route */}
        <Route path="/orders" element={<OrderHistory />} />
        
        <Route path="/login" element={<Login />} />

      </Routes>

    </BrowserRouter>
  );
};

export default App;