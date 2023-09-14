import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import { TokenProvider} from './TokenContext';
import Navbar from './Navbar';

const Admin = () => {
    const [leavedata, setLeaveData] = useState([]);
    const [leavetypedata, setLeaveTypeData] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [empleavedata, setEmpLeaveData] = useState([]);
    const employee_url = process.env.REACT_APP_API_EMPLOYEE_URL
    const leave_apply_url = process.env.REACT_APP_API_LEAVE_APPLY_URL
    const leave_update_url = process.env.REACT_APP_API_LEAVE_UPDATE_URL
    const employee_update_url = process.env.REACT_APP_API_EMPLOYEE_UPDATE_URL
    const leave_type_url = process.env.REACT_APP_API_LEAVE_TYPE_URL
    const leave_type_update_url = process.env.REACT_APP_API_LEAVE_TYPE_UPDATE_URL


    useEffect(() => {
        fetchEmployees();
        fetchleaves();
        fetchleave_types();
      }, []);

      const fetchEmployees = async () => {
        try {
          const response = await axios.get(employee_url);
          setEmployees(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };

      const fetchleaves = async () => {
        try {
          const response = await axios.get(leave_apply_url);
          setLeaveData(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };

      const fetchleave_types = async () => {
        try {
          const response = await axios.get(leave_type_url);
          setLeaveTypeData(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };

      const rejectleave = async (leaveId)  => {

        let getleave = await axios.get(`${leave_update_url}${leaveId}`)
        getleave.data.status = 'Rejected'
        console.log(getleave.data)
  
        if (window.confirm('Are you sure you want to reject the leave request')){
        try {
          await axios.put(`${leave_update_url}${leaveId}`,getleave.data);
          alert('Leave request rejected ')
          fetchleaves()
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      }
      }

      const approveleave = async (leaveId)  => {

        let getleave = await axios.get(`${leave_update_url}${leaveId}`)
        getleave.data.status = 'Approved'
        if (window.confirm('Are you sure you want to approve the leave request')){

        try {
            await axios.put(`${leave_update_url}${leaveId}`,getleave.data);
            alert('Leave request approved ')
            fetchleaves()
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
        let getleave_type = leavetypedata.find((types) => types.employee === getleave.data.emp)
        const selectedleave = getleave.data.leave_type
        const leavesleft = getleave_type[selectedleave] - getleave.data.days
        getleave_type[selectedleave] = leavesleft
        console.log(getleave_type,selectedleave)
        try {
            await axios.put(`${leave_type_update_url}${getleave_type.id}`,getleave_type);
            fetchleaves()
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
      }
      }


      function FormattedLeaveType(str) {

        // converting first letter to uppercase
        const formatted = str.charAt(0).toUpperCase() + str.slice(1).replace('_',' ');
      
        return formatted;
      }


      return(
        <TokenProvider>
      <div className='admin-container'>
      <Navbar/>
          
        {empleavedata && (
        <div className="submitted-data-container">
          <div className="submitted-data-box">

            <h3>Leave Data</h3>
            {/* Changes start here */}
            <table>
              <thead className='table-header'>
             
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
                </tr>
              </thead>
              <tbody>
                  {leavedata.map((leave) => (
                  <tr key={leave.id} >
                    <>
                    {employees.filter(employee => employee.id === leave.emp).map((employee) => (
                        <td>{employee.emp_name}</td>  
                    ))}
                    {employees.filter(employee => employee.id === leave.emp).map((employee) => (
                        <td>{employee.emp_id}</td>  
                    ))}
                    </>
                    <td>{FormattedLeaveType(leave.leave_type)}</td>
                    <td>{leave.start_date}</td>
                    <td>{leave.end_date}</td>
                    <td>{leave.days}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.status}</td>
                    <td>
                    <span className='approve'>
                    {leave.status === 'Pending' &&(
                    <button onClick={() => approveleave(leave.id)}className="approve-button">
                      Approve
                      </button>
                      )}
                      </span>
                      
                    {leave.status === 'Pending' &&(
                    <button onClick={() => rejectleave(leave.id)}className="delete-button">
                      Reject
                      </button>
                      )}
                    {leave.status === 'Rejected' &&(
                        <strong>Completed</strong>
                      
                      )}
                      
                    {leave.status === 'Approved' &&(
                        <strong>Completed</strong>
                      
                      )}
                    </td>
                    
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

export default Admin;