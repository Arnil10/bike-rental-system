import React, { useState, useEffect } from "react";
import axios from "axios";
import './UpdateBikes.css'
const UpdateBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [newPrice, setNewPrice] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch bikes from the database
  useEffect(() => {
    axios
      .get("http://localhost:3000/showBikes") // Replace with your API endpoint
      .then((response) => {
        setBikes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bikes:", error);
      });
  }, []);

  // Handle price input change
  const handlePriceChange = (bike_id, price) => {
    setNewPrice((prevState) => ({ ...prevState, [bike_id]: price }));
  };

  // Handle price update
  const updatePrice = (bike_id) => {
    if (!newPrice[bike_id] || isNaN(newPrice[bike_id])) {
      setError("Please enter a valid price.");
      return;
    }
    setError("");
    axios
      .put(`http://localhost:3000/updatePrice`, { bike_id, price: newPrice[bike_id] })
      .then((response) => {
        setSuccessMessage(`Price updated for bike ID: ${bike_id}`);
  
      })
      .catch((error) => {
        console.error("Error updating price:", error);
        setError("Failed to update the price. Please try again.");
      });
  };


  const deleteBike=(id)=>{
    axios.delete(`http://localhost:3000/deleteBike/${id}`).then((response)=>{
    setBikes(bikes.filter((val)=>{
      return val.bike_id != id;
    }))
  })
  }

  return (
    <div className="update-bikes-container">
      <h1 className="update-bikes-header">Update Bikes</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <table className="bikes-table">
        <thead>
          <tr >
            <th width="108">ID</th>
            <th width="108">Name</th>
            <th width="108">Model</th>
            <th width="108">Price</th>
            <th width="108">Action</th>
            <th width="108">Action</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <tr style={{color:"black"}} key={bike.bike_id}>
              <td>{bike.bike_id}</td>
              <td>{bike.bike_name}</td>
              <td>{bike.Model}</td>
              <td>
                <input
                  type="number"
                  placeholder={`Current: $${bike.price}`}
                  value={newPrice[bike.bike_id] || ""}
                  onChange={(e) => handlePriceChange(bike.bike_id, e.target.value)}
                  className="price-input"
                />
              </td>
              <td>
                <button
                  onClick={() => updatePrice(bike.bike_id)}
                  className="update-button"
                >
                  Update Price
                </button>
                
              </td>
              <td>
                <button
                    onClick={() => deleteBike(bike.bike_id)}
                    className="update-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateBikes;
