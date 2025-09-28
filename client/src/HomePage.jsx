import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './HomePage.css';

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Random bike image URLs
  const bikeImages = [
    "https://wallpaperaccess.com/full/1398287.jpg", // Placeholder bike image 1
    "https://cdn.vi-grade.com/win-hg5omb50dlm/vigrade2020.com/dynimg/en-0110-3e35.jpg?210228202236", // Placeholder bike image 2
    "https://wallpaperaccess.com/full/6522852.jpg", // Placeholder bike image 3
    "https://www.drivencarguide.co.nz/media/100029703/221022nzhmdgroyal01.jpg?rnd=133107322830000000", // Placeholder bike image 4
    "http://mms.businesswire.com/media/20140804005005/en/425039/5/Scout-Press-Release-Image.jpg",
    "https://cdn.visordown.com/field/image/opener_2.jpg"
  ];

  // Automatically move the slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bikeImages.length);
    }, 100000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [bikeImages]);

  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-items">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/available-bikes" className="nav-link">Available Bikes</Link>
        </div>
      </nav>

      {/* Home Page Content */}
      <div className="slider-container">
        <h2>Explore Our Bikes</h2>

        <div className="slider">
          <div
            className="slider-images"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {bikeImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Bike ${index}`}
                className="slider-image"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="cta">
        <Link to="/available-bikes" className="cta-button">
          View Available Bikes
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
