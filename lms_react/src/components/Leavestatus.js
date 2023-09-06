import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leavestatus.css';
import {Link, useNavigate} from 'react-router-dom';
import { TokenProvider,useToken } from './TokenContext';
import Navbar from './Navbar';
import Logout from './Logout';

const Leavestatus = () => {
    const [leavedata, setLeaveData] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [empleavedata, setEmpLeaveData] = useState([]);
    const [token, setToken] = useState(() => {
      // Retrieve the token from localStorage
      const storedToken = localStorage.getItem('token');
      return storedToken || ''; // Return an empty string if the token is not present
    });
    const [user, setUser] = useState(() => {
      // Retrieve the token from localStorage
      const username = localStorage.getItem('authToken');
      return username || ''; // Return an empty string if the token is not present
    });
    const history = useNavigate();


    useEffect(() => {
        fetchData();
        // fetchleaves();
      }, []);

      const fetchData = async () => {
        const response = await axios.get('http://localhost:8000/lms/employee/');
        const employees = response.data
        const emp = employees.find((employee) => employee.emp_name === user)
        console.log(token.username)
        const employee = await axios.get(`http://localhost:8000/lms/employee/update/${emp.id}`);
        setSelectedEmployee(employee.data);
        console.log(selectedEmployee)
        const employee_leaves = await axios.get('http://localhost:8000/lms/apply/');
        const leavedata = employee_leaves.data
        setEmpLeaveData(leavedata);
        const requested_leave = leavedata.filter(leave => leave.emp === emp.id)
        setEmpLeaveData(requested_leave) 
      };

      // const Logout = async () => {
        
      //   try {
      //     const response = await fetch('http://localhost:8000/api/logout/', {
      //       method: 'POST',
      //       headers: {
      //         'Authorization':'Token'+' '+token, // Replace with the user's actual token
      //       },
      //     });
    
      //     if (response.status === 200) {
      //       console.log('Logout successful');
      //       history("/");
      //       // Handle success, maybe clear token from state or local storage
      //     } else {
      //       console.error('Logout failed');
      //       console.log('Token'+ ' '+token.token)
      //       // Handle failure, show an error message
      //     }
      //   } catch (error) {
      //     console.error('Error:', error);
      //     // Handle error, show an error message
      //   }
      // };

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
          fetchData()
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      }
      }

      return(
        <TokenProvider>
      <div className='leavestatus-container'>
      <Navbar />         
        {empleavedata && (
        <div className="submitted-data-container">
          <div className="submitted-data-box">

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
                    <>
                  {leave.status === 'pending' &&(<th>Action</th>)}
                  </>
                  ))}
                </tr>
              </thead>
              <tbody>
  
                    {/* <td>{selectedEmployee.emp_name}</td>
                    <td>{selectedEmployee.emp_id}</td> */}
                    {/* <td>{empleavedata.available_leaves}</td> */}
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
            {/* Changes end here */}
          </div>
        </div>
      )}

          </div>
          </TokenProvider>
      )

};

export default Leavestatus;