import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import {Link} from 'react-router-dom';

const Admin = () => {
    const [leavedata, setLeaveData] = useState([]);
    const [leavetypedata, setLeaveTypeData] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [empleavedata, setEmpLeaveData] = useState([]);


    useEffect(() => {
        fetchEmployees();
        fetchleaves();
        fetchleave_types();
      }, []);

      const fetchEmployees = async () => {
        try {
          const response = await axios.get('http://localhost:8000/lms/employee/');
          setEmployees(response.data);
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

      const fetchleave_types = async () => {
        try {
          const response = await axios.get('http://localhost:8000/lms/leave_type/');
          setLeaveTypeData(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };

      const handleEmployeeChange = async (e) => {
        const selectedEmpId = parseInt(e.target.value);
        const selectedEmp = employees.find((emp) => emp.id === selectedEmpId);
        console.log(selectedEmp)
        setSelectedEmployee(selectedEmp);
        const requested_leave = leavedata.filter(leave => leave.emp === Number(selectedEmpId))
        console.log(selectedEmployee)
        setEmpLeaveData(requested_leave) 
      }; 

      const rejectleave = async (leaveId)  => {

        let getleave = await axios.get(`http://localhost:8000/lms/update/${leaveId}`)
        getleave.data.status = 'Rejected'
        console.log(getleave.data)
  
        if (window.confirm('Are you sure you want to reject the leave request')){
        try {
          await axios.put(`http://localhost:8000/lms/update/${leaveId}`,getleave.data);
          alert('Leave request rejected ')
          fetchleaves()
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      }
      }

      const approveleave = async (leaveId)  => {

        let getleave = await axios.get(`http://localhost:8000/lms/update/${leaveId}`)
        getleave.data.status = 'Approved'
        if (window.confirm('Are you sure you want to approve the leave request')){

        try {
            await axios.put(`http://localhost:8000/lms/update/${leaveId}`,getleave.data);
            alert('Leave request approved ')
            fetchleaves()
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
            
        // let leave_types = await axios.get('http://localhost:8000/lms/leave_type')
        let getleave_type = leavetypedata.find((types) => types.employee === getleave.data.emp)
        const selectedleave = getleave.data.leave_type
        const leavesleft = getleave_type[selectedleave] - getleave.data.days
        getleave_type[selectedleave] = leavesleft
        console.log(getleave_type,selectedleave)
        try {
            await axios.put(`http://localhost:8000/lms/leave_type/update/${getleave_type.id}`,getleave_type);
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
      <div className='admin-container'>
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
                </tr>
              </thead>
              <tbody>
  
                    {/* <td>{selectedEmployee.emp_name}</td>
                    <td>{selectedEmployee.emp_id}</td> */}
                    {/* <td>{empleavedata.available_leaves}</td> */}
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
                    {/* <td>{selectedEmployee.emp_name}</td>
                    <td>{selectedEmployee.emp_id}</td> */}
                    <td>{FormattedLeaveType(leave.leave_type)}</td>
                    <td>{leave.start_date}</td>
                    <td>{leave.end_date}</td>
                    <td>{leave.days}</td>
                    <td>{leave.reason}</td>
                    <td>{leave.status}</td>
                    <td>
                    {leave.status === 'Pending' &&(
                    <button onClick={() => approveleave(leave.id)}className="approve-button">
                      Approve
                      </button>
                      )}
                      
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
            {/* Changes end here */}
          </div>
        </div>
      )}

          </div>
      )
};

export default Admin;