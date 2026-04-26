import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Hero from "./assets/components/Hero";
import Navbar from "./assets/components/Navbar";
import MenuSection from "./assets/components/MenuSection";
import About from "./assets/components/About";
import Reservation from "./assets/components/Reservation";
import Menu from "./assets/components/Menu";
import Payment from "./assets/components/Payment";


//  Scroll to section handler
const ScrollToSection = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);

      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 150); // slight delay for render
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
};


//  Landing Page (Home)
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


//  Main App Component
const App = () => {
  return (
    <BrowserRouter>

      {/* Scroll logic */}
      <ScrollToSection />

      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
         <Route path="/payment" element={<Payment />} />
      </Routes>

    </BrowserRouter>
  );
};

export default App;