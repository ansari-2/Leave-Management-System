import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LeaveForm.css';
import Navbar from './Navbar';
import {Link,useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; 
import { notification } from 'antd'
import { TokenProvider,useToken } from './TokenContext';

const LeaveForm = () => {
  const [showSubmittedData, setShowSubmittedData] = useState(false); // for showing submitted data
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [leave, setLeave] = useState('');
  const [selectedleave, setSelectedLeave] = useState('');
  const [days, setDays] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
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
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeleaveTypes, setEmployeeLeaveTypes] = useState([]);
  const [formData, setFormData] = useState({
    emp_firstname: '',
    emp_id: '',
    available_leaves: '',
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: '',
  });
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    fetchLeaveTypes();
    fetchEmployees();
    // fetchEmployeeLeaveTypes();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:8000/lms/employee/');
    const employees = response.data
    const emp = employees.find((employee) => employee.emp_name === user)
    const employee = await axios.get(`http://localhost:8000/lms/employee/update/${emp.id}`);
    setSelectedEmployee(employee.data);
    console.log(selectedEmployee)
  };

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/lms/leave_type/');
      setLeaveTypes(response.data);
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
  };

  // const handleEmployeeChange = async (e) => {
  //   const selectedEmpId = e.target.value;
  //   setEmployeeId(selectedEmpId);
  //   setSelectedEmployee(employees.find((employee) => employee.id === parseInt(selectedEmpId)));
   
  // };

  const handleLeaveChange = async (e) => {
    const leaveid = leaveTypes.filter(types => types.employee === Number(selectedEmployee.id))
    // console.log(leaveid[0]["id"])
    try {
      const response = await axios.get(`http://localhost:8000/lms/leave_type/update/${leaveid[0]["id"]}`);
      setEmployeeLeaveTypes(response.data);
      // console.log(employeeleaveTypes)
    } catch (error) {
      console.error('Error fetching leave types:', error);
    }
    setSelectedLeave(e.target.value)
    setLeave(employeeleaveTypes[selectedleave])
    // console.log(employeeleaveTypes[selectedleave])
  };

  const Logout = async () => {
        
    try {
      const response = await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Authorization':'Token'+' '+token, // Replace with the user's actual token
        },
      });

      if (response.status === 200) {
        console.log('Logout successful');
        localStorage.removeItem(['authToken','user'])
        history("/");
        // Handle success, maybe clear token from state or local storage
      } else {
        console.error('Logout failed');
        console.log('Token'+ ' '+token.token)
        // Handle failure, show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error, show an error message
    }
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
      const response = await axios.put(
        `http://localhost:8000/lms/leave_type/updat/${employeeleaveTypes['id']}`,
        Leave_type_data
      );
      // console.log('Data submitted successfully:', response.data);
      notification.success({
        message: 'Leave Requested Successfully',
        description:'Check Leave Status for further process',
      });
    } catch (error) {
      console.error('Error submitting data:', error);
 
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/lms/apply/',
        LeaveData
      );
      console.log('Data submitted successfully:', response.data);
      // alert('Data submitted successfully');
      notification.success({
        message:'Leave Request Submitted',
        description:'For further updates check leave status'
      })
    } catch (error) {
      console.error('Error submitting data:', error);
 
    }

    // Add the submitted data to the list
    setSubmittedData((prevSubmittedData) => [...prevSubmittedData, formData]);
    // console.log(submittedData)

    setShowSubmittedData(true); // Show the submitted data box
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

  // const handleEmployeeSelect = (event) => {
  //   const selectedId = event.target.value;
  //   setSelectedEmployeeId(selectedId);

  //   const selectedEmployee = employees.find((employee) => employee.id === parseInt(selectedId));

  //   if (selectedEmployee) {
  //     setFormData({
  //       emp_firstname: selectedEmployee.emp_name,
  //       emp_id: selectedEmployee.emp_id,
  //       available_leaves: selectedEmployee.designation,
  //       leave_type: selectedEmployee.leave_type,
  //       start_date: selectedEmployee.start_date,
  //       end_date: selectedEmployee.end_date,
  //       reason: selectedEmployee.reason,
  //     });
  //   } else {
  //     setFormData({
  //       emp_name: '',
  //       emp_id: '',
  //       available_leaves: '',
  //       leave_type: '',
  //       start_date: '',
  //       end_date: '',
  //       reason: '',
  //     });
  //   }
  // };

  const numberofleaves = () => {
    return (employeeleaveTypes[selectedleave])

  }

  return (
    <TokenProvider>
    <div className="leaveform-container"> 
        <div className="nav-bar">
        <Link to="/dashboard" className="nav-item">Dashboard</Link>
        <Link to="/admin" className="nav-item">Admin</Link>
        <Link to="/apply" className="nav-item">Apply Leave</Link>
        <Link to="/leavestatus" className="nav-item">Leave Status</Link>
        <div className="navbar-title">Leave Management System</div>
        <div className='logout-div' onClick={Logout}>
          {/* <select value={employeeId} onChange={handleEmployeeChange} className='select'>
          <option value="none">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.emp_name}
            </option>
            ))}
             </select> */}
        <div className="nav-item">
        <span className="logout-icon"></span>Logout</div>
        </div>
      </div>
    
    <div className="container">

      <div className="employee-form-container">
        <form onSubmit={handleFormSubmit}>
          {/* ... Other form elements ... */}
          
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
                // onChange={handleInputChange}
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
                
                
                {/* {leaveTypes.map((leaveType) => (
                  <option key={leaveType.id} value={leaveType.id}>
                    {leaveType.leave_type}
                  </option>
                ))} */}
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

        {/* {showSubmittedData && (
        <div className="submitted-data-container">
          <div className="submitted-data-box">
          <button
          className="close-button"
          onClick={() => setShowSubmittedData(false)}
            >
            X
            </button> */}

            {/* <h3>Submitted Data</h3>
            {/* Changes start here */}
            {/* <table>
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Employee ID</th>
                  <th>Available Leaves</th>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {submittedData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.emp_firstname}</td>
                    <td>{data.emp_id}</td>
                    <td>{data.available_leaves}</td>
                    <td>{data.leave_type}</td>
                    <td>{data.start_date}</td>
                    <td>{data.end_date}</td>
                    <td>{data.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          
          </div>
        </div>
      )}  */}
    </div>
    </div>
    </TokenProvider>
  );
};

export default LeaveForm;