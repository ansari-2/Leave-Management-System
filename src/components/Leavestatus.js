import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leavestatus.css';
import {Link} from 'react-router-dom';

const Leavestatus = () => {
    const [leavedata, setLeaveData] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [empleavedata, setEmpLeaveData] = useState([]);


    useEffect(() => {
        fetchEmployees();
        fetchleaves();
      }, []);

      const fetchEmployees = async () => {
        try {
          const response = await axios.get('http://localhost:8000/lms/employee/');
          setEmployee(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };

      const fetchleaves = async () => {
        try {
          const response = await axios.get('http://localhost:8000/lms/apply/');
          setLeaveData(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };

      const handleEmployeeChange = async (e) => {
        const selectedEmpId = parseInt(e.target.value);
        const selectedEmp = employee.find((emp) => emp.id === selectedEmpId);
        console.log(selectedEmp)
        setSelectedEmployee(selectedEmp);
        const requested_leave = leavedata.filter(leave => leave.emp === Number(selectedEmpId))
        console.log(selectedEmployee)
        setEmpLeaveData(requested_leave) 
      }; 

      function FormattedLeaveType(str) {

        // converting first letter to uppercase
        const formatted = str.charAt(0).toUpperCase() + str.slice(1).replace('_',' ');
      
        return formatted;
      }

      const deleteleave = async (leaveId)  => {

        if (window.confirm('Are you sure you want to delete the leave application')){
        try {
          await axios.delete(`http://localhost:8000/lms/update/${leaveId}`);
          alert('Leave application deleted ')
          const updatedleaveData = empleavedata.filter(leave => leave.id !== leaveId)
          setEmpLeaveData(updatedleaveData)
          fetchleaves()
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      }
      }

      return(
      <div className='leavestatus-container'>
      <div className="nav-bar">
        <Link to="/" className="nav-item">Dashboard</Link>
        <Link to="/admin" className="nav-item">Admin</Link>
        <Link to="/apply" className="nav-item">Apply Leave</Link>
        <Link to="/leavestatus" className="nav-item">Leave Status</Link>
        <div className="navbar-title">Leave Management System</div>
        <div className='logout'>
        <div className="nav-item">

        <span className="logout-icon"></span>Logout</div>
        <div>        <select onChange={handleEmployeeChange} className='select'>
        <option value="none">Select Employee</option>
        {employee.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.emp_name}
          </option>
          ))}
           </select></div>
        </div>
      </div>          
        {empleavedata && (
        <div className="submitted-data-container">
          <div className="leave-table2">

            <h3>Leave Data</h3>
            {/* Changes start here */}
            <table>
              <thead>
             
                  <tr>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  {/* <th>Available Leaves</th> */}
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Number of Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                  {empleavedata.map((leave) => (
                    <th>
                  {leave.status === 'pending' &&(<th>Action</th>)}
                  </th>
                  ))}
                </tr>
              </thead>
              <tbody>
  
                    {/* <td>{selectedEmployee.emp_name}</td>
                    <td>{selectedEmployee.emp_id}</td> */}
                    {/* <td>{empleavedata.available_leaves}</td> */}
                  {empleavedata.map((leave) => (
                  <tr key={leave.id} className={leave.status === 'Pending' ? 'pending' : (leave.status === 'Approved' ? 'approved' : 'rejected')}>
                    <td>{selectedEmployee.emp_name}</td>
                    <td>{selectedEmployee.emp_id}</td>
                    <td>{FormattedLeaveType(leave.leave_type)}</td>
                    <td>{leave.start_date}</td>
                    <td>{leave.end_date}</td>
                    <td>{leave.days}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.status}</td>
                    {leave.status === 'Pending' &&(<td><button onClick={() => deleteleave(leave.id)}className="delete-button">
                      Delete
                      </button></td>)}
                      <td>{leave.status === 'Approved'  &&(<><strong>Completed</strong></>)}
                      {leave.status === 'Rejected'  &&(<><strong>Completed</strong></>)}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Changes end here */}
          </div>
        </div>
      )}

          </div>
      )
};

export default Leavestatus;