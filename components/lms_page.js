import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './lms_page.css'

function LeaveApplication() {
  const [employeeId, setEmployeeId] = useState('');
  const [leave, setLeave] = useState('');
  const [days, setDays] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeleaveTypes, setEmployeeLeaveTypes] = useState([]);

  useEffect(() => {
    fetchLeaveTypes();
    fetchEmployees();
    // fetchEmployeeLeaveTypes();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/lms/employee/');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/lms/leave_type/');
      setLeaveTypes(response.data);
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
  };

//   const fetchEmployeeLeaveTypes = async () => {
//     const leaveid = leaveTypes.filter(types => types['employee'] === employees.id)
//     console.log(selectedEmployee)
//     try {
//       const response = await axios.get('http://localhost:8000/lms/leave_type/');
//       setEmployeeLeaveTypes(response.data);
//     } catch (error) {
//       console.error('Error fetching leave types:', error);
//     }
//   };


  const handleEmployeeChange = async (e) => {
    const selectedEmpId = e.target.value;
    setEmployeeId(selectedEmpId);
    setSelectedEmployee(employees.find((employee) => employee.id === parseInt(selectedEmpId)));
   
  };

  const handleLeaveChange = async (e) => {
    const leaveid = leaveTypes.filter(types => types.employee === Number(employeeId))
    // console.log(leaveid[0]["id"])
    try {
      const response = await axios.get(`http://localhost:8000/lms/leave_type/update/${leaveid[0]["id"]}`);
      setEmployeeLeaveTypes(response.data);
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
    const selectedleave = e.target.value
    setLeave(employeeleaveTypes[selectedleave])
    console.log(leave)
    // console.log(employeeleaveTypes[selectedleave])
  };

  const handleApplyLeave = async () => {
    console.log(leave)
    try {
      const response = await axios.post('http://localhost:8000/lms/apply/', {
        employee: employeeId,
        // leave_type: leaveTypeId,
        days: days,
        start_date: startDate,
        end_date: endDate,
        reason: reason,
      });

      if (response.status === 201) {
        console.log('Leave application successful');
        // Update leave types and do any necessary state management
      }
    } catch (error) {
      console.error('Error applying for leave:', error);
      // Handle error, show error message to the user
    }
  };

  return (
    <div>
    <nav className="navbar">
        {selectedEmployee && (
          <div className="employee-details">
          <p className="employee-detail"><strong>Name:</strong> {selectedEmployee.emp_name}</p>
          <p className="employee-detail"><strong>Employee ID:</strong> {selectedEmployee.emp_id}</p>
          <p className="employee-detail"><strong>Designation:</strong> {selectedEmployee.designation}</p>
        </div>
        )}
      </nav>
      <form className="leave-form">
      <select value={employeeId} onChange={handleEmployeeChange}>
        <option value="none">Select Employee</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.emp_name}
          </option>
        ))}
      </select>
      <select  onChange={handleLeaveChange}>
          <option value="">Select Leave Type</option>
          <option value="annual_leave">Annual Leave</option>
          <option value="sick_leave">Sick/Personal Leave</option>
          <option value="bereavement_leave">Bereavement Leave</option>
          <option value="maternity_leave">Maternity Leave</option>
          <option value="paternity_leave">Paternity Leave</option>
          <option value="study_leave">Study Leave</option>
          
          
          {/* {leaveTypes.map((leaveType) => (
            <option key={leaveType.id} value={leaveType.id}>
              {leaveType.leave_type}
            </option>
          ))} */}
        </select>
        <input
          type="number"
          placeholder="Available"
          value={leave}
          // onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <textarea
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button className="submit-button" onClick={handleApplyLeave}>Apply</button>
      </form>
    </div>
  );
}

export default LeaveApplication;
