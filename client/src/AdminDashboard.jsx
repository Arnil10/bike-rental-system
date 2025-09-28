import React, { useState } from 'react';
import './AdminDashBoard.css'; // Import custom CSS for styling (optional)
import Addbikes from './Addbikes';
import Showbikes from './Showbikes';
import Showusers from './Showusers';
import ShowTerminals from './showTerminals';
import UpdateBikes from './UpdateBikes';

import ShowTrans from './ShowTrans';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('bikes');

  // Simulated data (replace with API calls)


  // Handler for switching sections
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <nav className="sidebar">
        <h2 style={{color:"white"}}>Admin Dashboard</h2>
        <ul>
          <li onClick={() => handleSectionChange('bikes')}>Manage Bikes</li>
          <li onClick={() => handleSectionChange('users')}>Manage Users</li>
          <li onClick={() => handleSectionChange('add-bike')}>Add Bike</li>
          <li onClick={() => handleSectionChange('update')}>Update Prices</li>
          <li onClick={() => handleSectionChange('terminals')}>Terminals</li>
          <li onClick={() => handleSectionChange('transactions')}>Transactions</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        {activeSection === 'bikes' && (
          <section>
            <h2 style={{color:"black"}}>Bike List</h2>

            <Showbikes/>

          </section>
        )}

        {activeSection === 'users' && (
          <section>
            <h2 style={{color:"black"}}>User List</h2>

            <Showusers/>
          </section>
        )}

        {activeSection === 'add-bike' && (
          <section>
            

            <Addbikes/>

          </section>
        )}


        {activeSection === 'terminals' && (
          <section>
            <h2 style={{color:"black"}}>Terminal List</h2>

            <ShowTerminals/>

          </section>
        )}

        {activeSection === 'update' && (
          <section>
            <h2 style={{color:"black"}}>Bike List</h2>

            <UpdateBikes/>

          </section>
        )}  

        {activeSection === 'transactions' && (
          <section>
            <h2 style={{color:"black"}}>Bike List</h2>

            <ShowTrans/>

          </section>
        )}  
      </div>
    </div>
  );
};

export default AdminDashboard;
