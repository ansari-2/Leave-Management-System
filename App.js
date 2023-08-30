import React from 'react';
import {Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import LeaveApplication from './components/lms_page';
import './App.css';
import LeaveForm from './components/LeaveForm';
import Leavestatus from './components/Leavestatus';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import Tokens from './components/tokens';




function App() {
  return (
  
    
  
    <Router>
      <div className='App'>
      
          <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/lms" element={<LeaveApplication />} />
          <Route path="/apply" element={<LeaveForm />} />
          <Route path="/leavestatus" element={<Leavestatus />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/token" element={<Tokens />} />  
          </Routes>
      </div>
    </Router>
   
  );
}

export default App;
