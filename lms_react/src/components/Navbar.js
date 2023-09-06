import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './Authlogout'; 



function Navbar() {
  const navigate = useNavigate(); 
  const handleLogout = async () => {
  console.log('handleLogout called'); 
    const token = localStorage.getItem('token');
    console.log(token)
    await logout(token,navigate); 
  
  };
  return (
    <div className="nav-bar">
        <Link to="/dashboard" className="nav-item">Dashboard</Link>
        <Link to="/admin" className="nav-item">Admin</Link>
        <Link to="/apply" className="nav-item">Apply Leave</Link>
        <Link to="/leavestatus" className="nav-item">Leave Status</Link>
        <div className="navbar-title">Leave Management System</div>
        <div className='logout-div' onClick={handleLogout}>
      
        <div className="nav-item">
        <span className="logout-icon"></span>Logout</div>
        </div>
      </div>
  );
}

export default Navbar;
