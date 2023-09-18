import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeaveForm.css';
import Navbar from './Navbar';
import 'react-toastify/dist/ReactToastify.css'; 
import { notification } from 'antd'
import { TokenProvider } from './TokenContext';

const LeaveForm = () => {
  const [selectedleave, setSelectedLeave] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem('authToken');
    return username || ''; 
  });
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeleaveTypes, setEmployeeLeaveTypes] = useState([]);
  const employee_url = process.env.REACT_APP_API_EMPLOYEE_URL
  const leave_apply_url = process.env.REACT_APP_API_LEAVE_APPLY_URL
  const employee_update_url = process.env.REACT_APP_API_EMPLOYEE_UPDATE_URL
  const leave_type_url = process.env.REACT_APP_API_LEAVE_TYPE_URL
  const leave_type_update_url = process.env.REACT_APP_API_LEAVE_TYPE_UPDATE_URL

 

  useEffect(() => {
    fetchLeaveTypes();
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get(employee_url);
    const employees = response.data
    const emp = employees.find((employee) => employee.emp_name === user)
    const employee = await axios.get(`${employee_update_url}${emp.id}`);
    setSelectedEmployee(employee.data);
    console.log(selectedEmployee)
  };

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get(leave_type_url);
      setLeaveTypes(response.data);
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
  };

  const handleLeaveChange = async (e) => {
    const leaveid = leaveTypes.filter(types => types.employee === Number(selectedEmployee.id))
    try {
      const response = await axios.get(`${leave_type_update_url}${leaveid[0]["id"]}`);
      setEmployeeLeaveTypes(response.data);
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
    setSelectedLeave(e.target.value)
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const updatedleave = numberofleaves() - calculateNoOfDays()

    const Leave_type_data = {
      employee: selectedEmployee.id,
      annual_leave: employeeleaveTypes['annual_leave'],
      sick_leave: employeeleaveTypes['sick_leave'],
      bereavement_leave: employeeleaveTypes['bereavement_leave'],
      maternity_leave: employeeleaveTypes['maternity_leave'],
      paternity_leave: employeeleaveTypes['paternity_leave'],
      study_leave: employeeleaveTypes['study_leave'],
     
      
    };
   if(selectedleave in Leave_type_data){
    Leave_type_data[selectedleave] = updatedleave
   }
    const LeaveData = {
      emp: selectedEmployee.id,
      start_date: startDate,
      end_date: endDate,
      leave_type: selectedleave,
      reason: reason,
      status: "Pending",
      days: calculateNoOfDays()
    }

    try {
      const response = await axios.post(leave_apply_url,LeaveData);
      console.log('Data submitted successfully:', response.data);
      notification.success({
        message:'Leave Request Submitted',
        description:'For further updates check leave status'
      })
    } catch (error) {
      console.error('Error submitting data:', error);
 
    }
  };

  const calculateNoOfDays = () => {
    if (startDate && endDate) {
      const fromDateObj = new Date(startDate);
      const toDateObj = new Date(endDate);
      const timeDiff = Math.abs(toDateObj - fromDateObj);
      const noOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1;
      return noOfDays;
    }
    return '';
}


  const numberofleaves = () => {
    return (employeeleaveTypes[selectedleave])

  }

  return (
    <TokenProvider>
    <div className="leaveform-container"> 
    <Navbar/>
    <div className="container">

      <div className="employee-form-container">
        <form onSubmit={handleFormSubmit}>    
          <div className="form-row">
          <div className="custom-layout">
             {selectedEmployee && ( 
             <>
            <div className="form-group">
              <label htmlFor="emp_firstname">Employee Name</label>
              <input
                type="text"
                id="emp_firstname"
                name="emp_firstname"
                value={selectedEmployee.emp_name } 
                // onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emp_id">Employee ID</label>
              <input
                type="text"
                id="emp_id"
                name="emp_id"
                value={selectedEmployee.emp_id}
              />
            </div> 
            </>
            )}
          </div>
          </div>
         
          <div className="form-row">
          <div className="custom-layout">
          <div className="form-group">
          <label htmlFor="leave_type">Leave Type</label>
          <select  onChange={handleLeaveChange}>
                <option value="">Select Leave Type</option>
                <option value="annual_leave">Annual/Earned Leave</option>
                <option value="sick_leave">Sick/Personal Leave</option>
                <option value="bereavement_leave">Bereavement Leave</option>
                <option value="maternity_leave">Maternity Leave</option>
                <option value="paternity_leave">Paternity Leave</option>
                <option value="study_leave">Study Leave</option>
              </select>
        </div>
        <div className="form-group">
          <label htmlFor="available_leaves">Available Leaves</label>
          <input
            type="text"
            id="available_leaves"
            name="available_leaves"
            value={numberofleaves()}
            // onChange={handleInputChange}
          />
        </div>
            <div className="form-group">
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="days">Number of Days</label>
              <input
                type="number"
                id="days"
                name="days"
                value={calculateNoOfDays()}
                readOnly
              />
            </div>
          </div>
          </div>
          <div className="form-row-type">
          <div className="form-group reason">
            <label htmlFor="reason">Reason</label>
            <textarea
              id="reason"
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          </div>
          <div className="form-buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
        </div>
    </div>
    </div>
    </TokenProvider>
  );
};

export default LeaveForm;