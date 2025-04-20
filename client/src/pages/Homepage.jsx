import React, { useState, useEffect } from "react";
import "./Homepage.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const images = [
  "/slide1.png",
  "/slide2.png",
  "/slide3.png",
  "/slide4.png",
];

const Homepage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Move to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Move to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="home">
      <div className="slider-container">
        <div className="slider">
          {images.map((img, index) => (
            <div
              key={index}
              className={`slide ${index === currentIndex ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>
        {/* Left Arrow */}
        <button className="arrow left" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        {/* Right Arrow */}
        <button className="arrow right" onClick={nextSlide}>
          <FaChevronRight />
        </button>
      </div>

      {/* Text and Button */}
      <div className="overlay">
        <h1>Your Perfect Getaway, Just a Click Away</h1>
        <Link to="/login" className="explore-btn">
          Explore Now
        </Link>
      </div>
    </div>
  );
};

export default Homepage;