import React, {useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './Authlogout'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const navigate = useNavigate(); 
  const [isuser,setisuser] =useState(true)



  useEffect(() => {
    adminlogin();
   }, []);

   function adminlogin() {
    const user = localStorage.getItem('authToken')
    if (user === 'admin'){
      setisuser(false)
      
    }
  };

  const handleLogout = async () => {
  console.log('handleLogout called'); 
    const token = localStorage.getItem('token');
    console.log(token)
    await logout(token,navigate); 
  
  };
  return (
    <>
    {isuser && (
    <div className="nav-bar">
        <Link to="/dashboard" className="nav-item">Dashboard</Link>
        {/* <Link to="/admin" className="nav-item">Admin</Link> */}
        <Link to="/apply" className="nav-item">Apply Leave</Link>
        <Link to="/leavestatus" className="nav-item">Leave Status</Link>
        <div className="navbar-title">Leave Management System</div>
        <div className='logout-div' onClick={handleLogout}>
      
        <div className="nav-item">
        <span className="logout-icon"></span><FontAwesomeIcon icon={faPowerOff} className='poweroff'/> Logout</div>
        </div>
      </div>
    )}
    {!isuser &&(
    <div className="nav-bar">
        <Link to="/admin" className="nav-item">Tasks</Link>
        <div className="navbar-title">Leave Management System</div>
        <div className='logout-div' onClick={handleLogout}>
        <div className="nav-item">
        <span className="logout-icon"></span><FontAwesomeIcon icon={faPowerOff} className='poweroff'/> Logout</div>
        </div>
      </div>) }
    </>
  );
}

export default Navbar;