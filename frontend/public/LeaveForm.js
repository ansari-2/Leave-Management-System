import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './LeaveForm.css';
import Dashboard from './Dashboard'; // Import the Dashboard component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const LeaveForm = () => {
  const [showSubmittedData, setShowSubmittedData] = useState(false); // for showing submitted data
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
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
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000//tp_employee/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');

    // Add the submitted data to the list
    setSubmittedData((prevSubmittedData) => [...prevSubmittedData, formData]);


    // tostify 
    toast.success('Leave form submitted successfully!');



    setShowSubmittedData(true); // Show the submitted data box
  };

  const handleEmployeeSelect = (event) => {
    const selectedId = event.target.value;
    setSelectedEmployeeId(selectedId);

    const selectedEmployee = employees.find((employee) => employee.id === parseInt(selectedId));

    if (selectedEmployee) {
      setFormData({
        emp_firstname: selectedEmployee.emp_firstname,
        emp_id: selectedEmployee.emp_id,
        available_leaves: selectedEmployee.available_leaves,
        leave_type: selectedEmployee.leave_type,
        start_date: selectedEmployee.start_date,
        end_date: selectedEmployee.end_date,
        reason: selectedEmployee.reason,
      });
    } else {
      setFormData({
        emp_name: '',
        emp_id: '',
        available_leaves: '',
        leave_type: '',
        start_date: '',
        end_date: '',
        reason: '',
      });
    }
  
    


  };

  return (
    <div className="background-image"> 
    <div className="container">
      <nav className="navbar fixed-top">
        <div className="navbar-title">Leave Management System</div>
        <Link to="/">
        <button className="dashboard-button">Go to Dashboard</button>
        </Link>
      </nav>
      <div className="employee-form-container">
        <form onSubmit={handleFormSubmit}>
          {/* ... Other form elements ... */}
          <div className="form-row">
          <div className="custom-layout">
            <div className="form-group">
              <label htmlFor="emp_firstname">Employee Name</label>
              <input
                type="text"
                id="emp_firstname"
                name="emp_firstname"
                value={formData.emp_firstname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emp_id">Employee ID</label>
              <input
                type="text"
                id="emp_id"
                name="emp_id"
                value={formData.emp_id}
                onChange={handleInputChange}
              />
            </div>
          </div>
          </div>
          <div className="form-row">
          <div className="custom-layout">
          <div className="form-group">
    <label htmlFor="leave_type">Leave Type</label>
    <select
      id="leave_type"
      name="leave_type"
      value={formData.leave_type}
      onChange={handleInputChange}
    >
      <option value="select">Select..</option>
      <option value="Paternity Leave">Paternity Leave</option>
      <option value="Maternity Leave">Maternity Leave</option>
      <option value="Sick Leave">Sick Leave</option>
      <option value="Marriage Leave">Marriage Leave</option>
      <option value="Casual Leave">Casual Leave</option>
    </select>
  </div>
  <div className="form-group">
    <label htmlFor="available_leaves">Available Leaves</label>
    <input
      type="text"
      id="available_leaves"
      name="available_leaves"
      value={formData.available_leaves}
      onChange={handleInputChange}
    />
  </div>
            <div className="form-group">
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
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
              value={formData.reason}
              onChange={handleInputChange}
            />
          </div>
          </div>
          <div className="form-buttons">
            <button type="submit">Submit</button>
          </div>
          <ToastContainer />  {/* tost notification  */}
        </form>
        </div>

        {showSubmittedData && (
        <div className="submitted-data-container">
          <div className="submitted-data-box">
          <button
          className="close-button"
          onClick={() => setShowSubmittedData(false)}
            >
            X
            </button>

            <h3>Submitted Data</h3>
            {/* Changes start here */}
            <table>
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
            {/* Changes end here */}
          </div>
        </div>
      )}
    </div>
    </div>


    

  );
};

export default LeaveForm;