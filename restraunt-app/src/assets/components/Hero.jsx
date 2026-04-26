import React from "react";

const Hero = () => {

  const handleScroll = () => {
    const section = document.getElementById("reservation");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="hero">
        <div className="content">
          <h2 className="welcome">Welcome to</h2>
          <h1 className="fine">Fine Dining Experience</h1>
          <h5 className="savor">
            savor the flavour of gourmet cuisine in an elegant ambiance
          </h5>

          <div>
            <button onClick={handleScroll}>
              <h3>Book a Table</h3>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;