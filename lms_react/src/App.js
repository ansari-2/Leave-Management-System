import React from 'react';
import {Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import LeaveForm from './components/LeaveForm';
import Leavestatus from './components/Leavestatus';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import Tokens from './components/tokens';
import PrivateRoute from './components/PrivateRoute';




function App() {
  return (
  
    
  
    <Router>
      <div className='App'>
      
          <Routes element={<PrivateRoute/>}>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apply" element={<LeaveForm />} />
          <Route path="/leavestatus" element={<Leavestatus />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Login />} />
          <Route path="/token" element={<Tokens />} />  
          </Routes>
      </div>
    </Router>
   
  );
}

export default App;
