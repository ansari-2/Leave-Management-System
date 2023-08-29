import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';



const Navbar = () => {
  return (
    <div className="dashboard-container">
      <div className="nav-bar">
        <div className="nav-item">Profile</div>
        <div className="nav-item">Leave Status</div>
        <div className="nav-item">Admin</div>
        <Link to="/apply" className="nav-item">Apply Leave</Link>
        <div className="navbar-title">Leave Management System</div>
        <div className='logout-div'>
        <div className="nav-item">
        <span className="logout-icon"></span>Logout</div>
        </div>
      </div>
      </div>
    
  );
};


export default Navbar;
