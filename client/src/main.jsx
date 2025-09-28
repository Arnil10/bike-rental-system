import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './Login.jsx';
import Showbikes from './Showbikes';
import App from './App.jsx'
import AdminDashboard from './AdminDashboard';
import AdminLogin from './Adminlogin.jsx'
import HomePage from './HomePage.jsx'
import AvailableBikesPage from './AvailableBikesPage';
import BookBike from './BookBike.jsx'

const root = ReactDOM.createRoot(document.getElementById("root")); // Updated root creation

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/available-bikes" element={<AvailableBikesPage />} />
        <Route path="/book-bike/:bikeId" element={<BookBike />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  </React.StrictMode>
);
