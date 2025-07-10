// src/components/LugarSlider.jsx
import React, { useRef } from "react";
import LugarCard from "./LugarCard";

function LugarSlider({ lugares }) {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    const cardWidth = container.querySelector(".lugar-slide")?.offsetWidth || 300;
    container.scrollBy({
      left: direction === "left" ? -cardWidth - 16 : cardWidth + 16,
      behavior: "smooth",
    });
  };

  return (
    <div className="slider-wrapper position-relative">
      <button
        className="slider-arrow left"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        &#8249;
      </button>

      <div className="scroll-container" ref={containerRef}>
        {lugares.map((lugar) => (
          <div key={lugar.id} className="lugar-slide">
            <LugarCard lugar={lugar} />
          </div>
        ))}
      </div>

      <button
        className="slider-arrow right"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        &#8250;
      </button>
    </div>
  );
}

export default LugarSlider;
