import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'; 
import './Register.css';
import axios from 'axios';


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [employeeid, setEmployeeID] = useState('');
  const history = useNavigate();
  const employee_url = process.env.REACT_APP_API_EMPLOYEE_URL
  const register_url = process.env.REACT_APP_API_REGISTER_URL

  const handleRegister = async () => {
    try {
      const response = await fetch(register_url, {
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
        const employeedata = {
          emp_id: employeeid,
          emp_name: username,
          emp_email: email,
          designation: designation
        }
        
        try {
          const response = await axios.post(employee_url,employeedata);
          console.log('Data submitted successfully:', response.data);
        } catch (error) {
          console.error('Error submitting data:', error);
        }
       history('/')
      } else {
        console.log(employee_url,register_url)
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }


  };

  return (
    <div>
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
