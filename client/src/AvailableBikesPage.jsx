import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './AvailableBikes.css';

const AvailableBikesPage = () => {
  const [bikes, setBikes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/showBikes") // Replace with your API endpoint
      .then((response) => {
        setBikes(response.data);
      })
      .catch((error) => {
        setError("Error fetching bikes. Please try again later.");
        console.error("Error fetching bikes:", error);
      });
  }, []);

  const handleBookBike = (bikeId) => {
    navigate(`/book-bike/${bikeId}`); // Redirect to the booking page with the bike ID
  };

  return (
    <div className="available-bikes-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-items">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/available-bikes" className="nav-link">Available Bikes</Link>
        </div>
      </nav>

      {/* Page Content */}
      <h2>Available Bikes</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="bike-list">
        {bikes.length > 0 ? (
          bikes.map((bike) => (
            <div className="bike-card" key={bike.bike_id}>
              <img src={bike.image || "https://s.tmimgcdn.com/scr/322900/motorbike-sport-and-gear-logo-flat-design-vector_322907-original.gif"} alt={bike.bike_name} className="bike-image" />
              <h3>{bike.bike_name}</h3>
              <p><strong>Model:</strong> {bike.Model}</p>
              <p><strong>Price:</strong> ${bike.price}/day</p>
              <p><strong>Status:</strong> {bike.Availability}</p>
              <button className="book-button" onClick={() => handleBookBike(bike.bike_id)}>Book Now</button>
            </div>
          ))
        ) : (
          <p>No bikes available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableBikesPage;
