import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leavestatus.css';
import { TokenProvider } from './TokenContext';
import Navbar from './Navbar';

const Leavestatus = () => {

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [empleavedata, setEmpLeaveData] = useState([]);
    const [token, setToken] = useState(() => {
      const storedToken = localStorage.getItem('token');
      return storedToken || ''; 
    });
    const [user, setUser] = useState(() => {
      const username = localStorage.getItem('authToken');
      return username || ''; 
    });
    const employee_url = process.env.REACT_APP_API_EMPLOYEE_URL
    const leave_apply_url = process.env.REACT_APP_API_LEAVE_APPLY_URL
    const employee_update_url = process.env.REACT_APP_API_EMPLOYEE_UPDATE_URL
    const leave_update_url = process.env.REACT_APP_API_LEAVE_UPDATE_URL
  


    useEffect(() => {
        fetchData();

      }, []);

      const fetchData = async () => {
        const response = await axios.get(employee_url);
        const employees = response.data
        const emp = employees.find((employee) => employee.emp_name === user)
        console.log(token.username)
        const employee = await axios.get(`${employee_update_url}${emp.id}`);
        setSelectedEmployee(employee.data);
        console.log(selectedEmployee)
        const employee_leaves = await axios.get(leave_apply_url);
        const leavedata = employee_leaves.data
        setEmpLeaveData(leavedata);
        const requested_leave = leavedata.filter(leave => leave.emp === emp.id)
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
          await axios.delete(`${leave_update_url}${leaveId}`);
          alert('Leave application deleted ')
          const updatedleaveData = empleavedata.filter(leave => leave.id !== leaveId)
          setEmpLeaveData(updatedleaveData)
          fetchData()
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      }
      }

      return(
        <TokenProvider>
      <div className='leavestatus-container'>
      <Navbar/>          
        {empleavedata && (
        <div className="submitted-data-container">
          <div className="submitted-data-box">

            <h3>Leave Data</h3>
            <table>
              <thead>
             
                  <tr>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Number of Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                  {empleavedata.map((leave) => (
                    <>
                  {leave.status === 'pending' &&(<th>Action</th>)}
                  </>
                  ))}
                </tr>
              </thead>
              <tbody>
                  {empleavedata.map((leave) => (
                  <tr key={leave.id}>
                    <td>{selectedEmployee.emp_name}</td>
                    <td>{selectedEmployee.emp_id}</td>
                    <td>{FormattedLeaveType(leave.leave_type)}</td>
                    <td>{leave.start_date}</td>
                    <td>{leave.end_date}</td>
                    <td>{leave.days}</td>
                    <td>{leave.reason}</td>
                    <td className={leave.status === 'Pending' ? 'pending' : (leave.status === 'Approved' ? 'approved' : 'rejected')}>{leave.status}</td>
                    {leave.status === 'Pending' &&(<td><button onClick={() => deleteleave(leave.id)}className="delete-button">
                      Delete
                      </button></td>)}
                      <>
                      {leave.status === 'Approved'  &&(<td>Completed</td>)}
                      {leave.status === 'Rejected'  &&(<td>Completed</td>)}</>
                    
                  </tr>
                ))}
              </tbody>
            </table>
         
          </div>
        </div>
      )}

          </div>
          </TokenProvider>
      )

};

export default Leavestatus;