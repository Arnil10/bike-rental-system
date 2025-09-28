import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './BookBike.css';

const BookBike = () => {
  const { bikeId } = useParams(); // Get the bike ID from the URL
  const [bikeDetails, setBikeDetails] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userName, setUserName] = useState(""); // New state for user name
  const [error, setError] = useState("");
  const [days,setdays]=useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false); // State for booking success message
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the bike details based on the bikeId
    axios
      .get(`http://localhost:3000/getBikeDetails/${bikeId}`)
      .then((response) => {
        setBikeDetails(response.data);
      })
      .catch((error) => {
        setError("Error fetching bike details.");
        console.error("Error fetching bike details:", error);
      });
  }, [bikeId]);

  const handleBooking = () => {
    if (!startDate || !endDate || !userName) {
      setError("Please fill in your name, start date, and end date.");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError("End date must be after the start date.");
      return;
    }

    // Send the booking request including the user's name
    axios
      .post("http://localhost:3000/bookBike", {
        bikeId,
        startDate,
        endDate,
        userName,
        days
         // Include the userName in the booking request
      })
      .then(() => {
        setBookingSuccess(true); // Set booking success to true
      })
      .catch((error) => {
        setError("Error booking the bike. Please try again later.");
        console.error("Booking error:", error);
      });
  };

  return (
    <div className="book-bikes-page">
      <h2>Book Bike</h2>

      {error && <p className="error-message">{error}</p>}
      {bookingSuccess && <p className="success-message">Booking Successful!</p>} {/* Show success message */}

      {bikeDetails ? (
        <div className="bike-details">
          <img
            src={bikeDetails.image || "https://s.tmimgcdn.com/scr/322900/motorbike-sport-and-gear-logo-flat-design-vector_322907-original.gif"}
            alt={bikeDetails.bike_name}
            className="bike-image"
          />
          <h3>{bikeDetails.bike_name}</h3>
          <p><strong>Model:</strong> {bikeDetails.model}</p>
          <p><strong>Color:</strong> {bikeDetails.color}</p>
          <p><strong>Price:</strong> ${bikeDetails.price} / day</p>
          <p><strong>Status:</strong> {bikeDetails.availability}</p>

          {/* New Name Input */}
          <div className="name-selection">
            <label>Your Email:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="name-selection">
            <label>estimated price:</label>
            <input
              type="text"
              value={days}
              onChange={(e) => setdays(bikeDetails.price*e.target.value)}
              placeholder="Enter days"
            />
          </div>

          <p><strong> Estimated Price:</strong> ${days}</p>


          {/* Start and End Date Selection */}
          <div className="date-selection">
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button className="book-button" onClick={handleBooking}>
            Book Now
          </button>
        </div>
      ) : (
        <p>Loading bike details...</p>
      )}
    </div>
  );
};

export default BookBike;
