import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Make sure to import Link from React Router
import './Register.css';
import axios from 'axios';
import {notification}  from 'antd'
import Navbar from './Navbar';

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
      const response = await fetch('http://localhost:8000/api/register/', {
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
        'http://localhost:8000/lms/employee/',
        employeedata
      );
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    // try {
    //   const response = await axios.get('http://localhost:8000/lms/employee/');
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
    //     'http://localhost:8000/lms/leave_type/',
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
        <Navbar />
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
