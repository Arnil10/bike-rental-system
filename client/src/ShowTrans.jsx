import React, { useState, useEffect } from "react";
import axios from "axios";
import './UpdateBikes.css';

const ShowTrans = () => {


  const [trans, setTrans] = useState([]);
 

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch bikes from the database
  useEffect(() => {
    axios
      .get("http://localhost:3000/showTransactions") // Replace with your API endpoint
      .then((response) => {
        setTrans(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bikes:", error);
      });
  }, []);


  


  const deleteTrans=(email)=>{
    axios.delete(`http://localhost:3000/deleteTrans/${email}`).then((response)=>{
    setTrans(trans.filter((val)=>{
      return val.email != email;
    }))
  })
  }

  return (
    <div className="update-bikes-container">
      <h1 className="update-bikes-header">Transactions</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <table className="bikes-table">
        <thead>
          <tr >
            <th width="305">Email</th>
            <th width="305">Bike ID</th>
            <th width="305">Start Date</th>
            <th width="305">End Date</th>
            <th width="305">Action</th>
          </tr>
        </thead>
        <tbody>
          {trans.map((tran) => (
            <tr style={{color:"black"}} key={tran.email}>
              <td>{tran.email}</td>
              <td>{tran.bike_id}</td>
              <td>{tran.start_date}</td>
              <td>{tran.end_date}</td>
          
              <td>
                <button
                    onClick={() => deleteTrans(tran.email)}
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

export default ShowTrans;
