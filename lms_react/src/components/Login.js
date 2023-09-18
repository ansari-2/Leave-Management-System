import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';
import { useToken } from './TokenContext';
import axios from 'axios';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {  setToken } = useToken();
  const history = useNavigate(); 
  const login_url = process.env.REACT_APP_API_LOGIN_URL
  const employee_url = process.env.REACT_APP_API_EMPLOYEE_URL
  const leave_type_url = process.env.REACT_APP_API_LEAVE_TYPE_URL

  

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(login_url, {
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
        if(data.username === 'admin'){
          history("/admin")
        }else{
        history("/dashboard");
        }
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
      const employees = await axios.get(employee_url);
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
      const leavetypes = await axios.get(leave_type_url)
    try {
      console.log(user.id)
      const exists = leavetypes.data.find((leavetype) => leavetype.employee === user.id)
      if(!exists){
        try {
          const response = await axios.post(leave_type_url, leavetypedata);
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
  };

  const Register = () =>{
    history('/register');
  }



  return (
    <div>
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

