import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Make sure to import Link from React Router
import './Register.css';
import axios from 'axios';
import {notification}  from 'antd'

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [employeeid, setEmployeeID] = useState('');
  const [activeuser, setActiveUser] = useState('');
  const [employees, setEmployees] = useState('');
  const history = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('https://lms-techp.uc.r.appspot.com/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.status === 201) {
        console.log('Registration successful');
       history('/')
      } else {
        console.error('Registration failed');
        // Handle failure, show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error, show an error message
    }
    const employeedata = {
      emp_id: employeeid,
      emp_name: username,
      emp_email: email,
      designation: designation
    }

    try {
      const response = await axios.post(
        'https://lms-techp.uc.r.appspot.com/lms/employee/',
        employeedata
      );
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    // try {
    //   const response = await axios.get('https://lms-techp.uc.r.appspot.com/lms/employee/');
    //   setEmployees(response.data)
    //   console.log(employees[employees.length - 1].id)
     
    // } catch (error) {
    //   console.error('Error submitting data:', error);
    // }
    // const emp = employees[employees.length - 1].id

    // const leavetypedata = {
    //   employee: emp,
    //   annual_leave: 12,
    //   sick_leave: 8,
    //   bereavement_leave: 8,
    //   maternity_leave: 15,
    //   paternity_leave: 5,
    //   study_leave: 5
    // }

    // try {
    //   const response = await axios.post(
    //     'https://lms-techp.uc.r.appspot.com/lms/leave_type/',
    //     leavetypedata
    //   );
    //   console.log('Data submitted successfully:', response.data);
    // } catch (error) {
    //   console.error('Error submitting data:', error);
    //   console.log(leavetypedata)
 
    // }

  };

  return (
    <div>
      <div className="nav-bar">
        <Link to="/" className="nav-item">Dashboard</Link>
        <Link to="/admin" className="nav-item">Admin</Link>
        <Link to="/apply" className="nav-item">Apply Leave</Link>
        <Link to="/leavestatus" className="nav-item">Leave Status</Link>
        {/* <Link to="/login" className="nav-item">Login</Link> */}
        <div className="navbar-title">Leave Management System</div>
        <div className='logout-div'>
          <div className="nav-item">
            <span className="logout-icon"></span>Logout
          </div>
        </div>
      </div>
      <div className="register-container">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Employee Id"
          value={employeeid}
          onChange={(e) => setEmployeeID(e.target.value)}
        />
        <input
          type="designation"
          placeholder="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;
