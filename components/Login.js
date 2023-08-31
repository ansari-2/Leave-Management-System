import React, { useState } from 'react';
// import { Link} from 'react-router-dom';
import {Link, json, useNavigate } from 'react-router-dom'; // Make sure you import Link
import './Login.css';
import { useToken } from './TokenContext';
import axios from 'axios';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeuser, setActiveUser] = useState('');
  const [employees, setEmployees] = useState('');
  const {  setToken } = useToken();
  const history = useNavigate(); 

  

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
     

      if (response.status === 200) {
        const data = await response.json();
        console.log('Login successful. Token:', data);
        setToken(data);
        localStorage.setItem('authToken', data.username);
        localStorage.setItem('token',data.token)
        history("/dashboard");
        
        // Handle success, maybe store token in state or local storage
      } else {
        console.error('Login failed');
        // Handle failure, show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error, show an error message
    }

    try {
      const employees = await axios.get('http://localhost:8000/lms/employee/');
      const user = employees.data.find((employee) => employee.emp_name === username)
      console.log(user)

      const leavetypedata = {
        employee: user.id,
        annual_leave: 12,
        sick_leave: 8,
        bereavement_leave: 8,
        maternity_leave: 15,
        paternity_leave: 5,
        study_leave: 5
      }
      const leavetypes = await axios.get('http://localhost:8000/lms/leave_type/')
    try {
      console.log(user.id)
      const exists = leavetypes.data.find((leavetype) => leavetype.employee === user.id)
      if(!exists){
        try {
          const response = await axios.post(
            'http://localhost:8000/lms/leave_type/',
            leavetypedata
          );
          console.log('Data submitted successfully:', response.data);
        } catch (error) {
          console.error('Error submitting data:', error);
          console.log(leavetypedata)
     
        }

      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
   
     
    } catch (error) {
      console.error('Error submitting data:', error);
    }
    // const emp = employees[employees.length - 1].id
  };

  const Register = () =>{
    history('/register');
  }



  return (
    <div>
      {/* Navigation Bar */}
     <div className="nav-bar">
        <Link to="/" className="nav-item">Dashboard</Link>
        <Link to="/admin" className="nav-item">Admin</Link>
        <Link to="/apply" className="nav-item">Apply Leave</Link>
        <Link to="/leavestatus" className="nav-item">Leave Status</Link>
        <Link to="/login" className="nav-item">Login</Link>
         <div className="navbar-title">Leave Management System</div>
        <div className='logout-div'>
          <div className="nav-item">
            <span className="logout-icon"></span>Logout
          </div>
        </div>
      </div> 

      {/* Login Form */}
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input
              type="text"
              name=""
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name=""
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <span onClick={Register} className='register'>Click here to register</span>
          <button className="login-button" href="#" onClick={handleLogin}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

