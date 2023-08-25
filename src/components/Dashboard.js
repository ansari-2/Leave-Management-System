import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import Navbar from './Navbar';


const data = [
  { name: 'Paternity Leave', leave_taken: 3, Paternity_leave: 8 },
  { name: 'Sick Leave', leave_taken: 3, Sick_leave: 9 },
  { name: 'Casual Leave', leave_taken: 3, Casual_leave: 9 },
  { name: 'Total Leave', leave_taken: 3, Total_leave: 15 },
];




const Dashboard = () => {
  return (
    <div className="dashboard-container">
        <div className="nav-bar">
        <Link to="/" className="nav-item">Dashboard</Link>
        <Link to="/admin" className="nav-item">Admin</Link>
        <Link to="/apply" className="nav-item">Apply Leave</Link>
        <Link to="/leavestatus" className="nav-item">Leave Status</Link>
        <div className="navbar-title">Leave Management System</div>
        <div className='logout-div'>
        <div className="nav-item">
        <span className="logout-icon"></span>Logout</div>
        </div>
      </div>
      <div className="content">
        <div className='firstdiv'>
      <div className="info-table-container">
        <table className="info-table">
          <tbody>
            <tr>
              <td className="info-label">Name</td>
              <td className="info-value">John Doe</td>
            </tr>
            <tr>
              <td className="info-label">Employee ID</td>
              <td className="info-value">12345</td>
            </tr>
            <tr>
              <td className="info-label">Designation</td>
              <td className="info-value">Software Engineer</td>
            </tr>
            <tr>
              <td className="info-label">Gender</td>
              <td className="info-value">Male</td>
            </tr>
            <tr>
              <td className="info-label">Date Of Join</td>
              <td className="info-value">10-07-2023</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* char starts */}
      <div className="bar-chart-container">
          <h2>Leave Statistics</h2>
          <ResponsiveContainer width="90%" height={210}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Legend />
              <Tooltip />
              <Bar dataKey="leave_taken" name="Leave Taken" fill="#ff9900" />
              <Bar dataKey="Paternity_leave" name="Paternity Leave" fill="#8884d8" />
              <Bar dataKey="Sick_leave" name="Sick Leave" fill="#82ca9d" />
              <Bar dataKey="Casual_leave" name="Casual Leave" fill="#ffc658" />
              <Bar dataKey="Total_leave" name="Total Leave" fill="#f50057" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
        {/* char ends */}
      <div className='leave-tables'>
      {/* leave-table1 removed */}
        <div className="leave-table2">
          <h2>Leave Balance</h2>
          <table>
            <thead>
              <tr>
                <th>Paternity Leave</th>
                <th>Sick Leave</th>
                <th>Casual Leave</th>
                <th>Study Leave</th>
                <th>Total Leave</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10 days</td>
                <td>15 days</td>
                <td>20 days</td>
                <td>12 days</td>
                <td>12 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
    
  );
};


export default Dashboard;
