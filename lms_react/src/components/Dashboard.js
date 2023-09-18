import {React,useState, useEffect} from 'react';
import './Dashboard.css';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import Navbar from './Navbar';
import { PieChart } from 'react-minimal-pie-chart';
import { TokenProvider,useToken } from './TokenContext';







const Dashboard = () => {

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [empleavedata, setEmpLeaveData] = useState(null);
  const [user, setUser] = useState(() => {
    // Retrieve the token from localStorage
    const username = localStorage.getItem('authToken');
    return username || ''; // Return an empty string if the token is not present
  });
  const employee_url = process.env.REACT_APP_API_EMPLOYEE_URL
  const employee_update_url = process.env.REACT_APP_API_EMPLOYEE_UPDATE_URL
  const leave_type_url = process.env.REACT_APP_API_LEAVE_TYPE_URL
 
  useEffect(() => {
      fetchEmployees();
    }, []);


    const fetchEmployees = async () => {
  
        const response = await axios.get(employee_url);
        const employees = response.data
        console.log(user)
        const emp = employees.find((employee) => employee.emp_name === user)
        console.log(employees)
        const employee = await axios.get(`${employee_update_url}${emp.id}`);
        setSelectedEmployee(employee.data);
        console.log(selectedEmployee)
        const employee_leaves = await axios.get(leave_type_url);
        const leavetypes = employee_leaves.data
        const requested_leave = leavetypes.filter(leave => leave.employee === emp.id)
        setEmpLeaveData(requested_leave) 

    };


    function bar(){
      if(empleavedata){
        const data = [
          console.log(typeof(empleavedata[0].annual_leave)),
          { name: 'Annual Leave', leave_taken: empleavedata[0].sick_leave, Annual_leave: 12 },
          { name: 'Sick Leave', leave_taken:  empleavedata[0].sick_leave , Sick_leave: empleavedata[0].sick_leave },
          { name: 'Bereavement Leave', leave_taken:  empleavedata[0].bereavement_leave, Bereavement_leave: empleavedata[0].bereavement_leave },
          { name: 'Maternity Leave', leave_taken:  empleavedata[0].maternity_leave, Maternity_leave: empleavedata[0].maternity_leave },
          { name: 'Paternity Leave', leave_taken:  empleavedata[0].paternity_leave, Paternity_leave: empleavedata[0].paternity_leave },
          { name: 'Study Leave', leave_taken:  empleavedata[0].study_leave, Study_leave: empleavedata[0].study_leave },
          { name: 'Total Leave', leave_taken:  totalleaves() , Total_leave: totalleaves() },
        ];
        return data
      }else{
        const data = [
      
          { name: 'Annual Leave', leave_taken: 3-1, Annual_leave: 8 },
          { name: 'Sick Leave', leave_taken: 3, Sick_leave: 9 },
          { name: 'Bereavement Leave', leave_taken: 3, Bereavement_leave: 9 },
          { name: 'Maternity Leave', leave_taken: 3, Maternity_leave: 15 },
          { name: 'Paternity Leave', leave_taken: 3, Paternity_leave: 15 },
          { name: 'Study Leave', leave_taken: 3, Study_leave: 15 },
          { name: 'Total Leave', leave_taken: 3, Total_leave: 15 },
        ];
        return data
      }

      
    }


    function totalleaves(){
      const sumValues = empleavedata[0].annual_leave + empleavedata[0].sick_leave
      return sumValues
    }

  return (
    <TokenProvider>
    <div className="dashboard-container">
     <Navbar/>
      
      <div className="content">
        <div className='firstdiv'>
      <div className="info-table-container">
        <table className="info-table">
          <tbody>
            <tr>
                <td className="info-label">Employee Name</td>
                {selectedEmployee &&(
                <td className="info-value">{selectedEmployee.emp_name}</td>
                )} 
            </tr>
            <tr>
                <td className="info-label">Employee ID</td>
                {selectedEmployee &&(
                <td className="info-value">{selectedEmployee.emp_id}</td>
                )} 
            </tr>
            <tr>
                <td className="info-label">Employee Designation</td>
                {selectedEmployee &&(
                <td className="info-value">{selectedEmployee.designation}</td>
                )} 
            </tr>  

          </tbody>
        </table>
        <br></br>
        <br></br>
      <div className="submitted-data-box">
          <h2>Leave Balance</h2>
          <table>
            <thead>
              <tr>
                <th>Annual Leave</th>
                <th>Sick Leave</th>
                <th>Bereavement Leave</th>
                <th>Maternity Leave</th>
                <th>Paternity Leave</th>
                <th>Study Leave</th>
                <th>Total Leaves</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {empleavedata  &&(
                  <>
                <td>{empleavedata[0]["annual_leave"]}</td>
                <td>{empleavedata[0].sick_leave}</td>
                <td>{empleavedata[0].bereavement_leave}</td>
                <td>{empleavedata[0].maternity_leave}</td>
                <td>{empleavedata[0].paternity_leave}</td>
                <td>{empleavedata[0].study_leave}</td>
                <td>{totalleaves()}</td>

                </>
                )}
              </tr>
            </tbody>
          </table>
        </div>
      {/* </div> */}
      </div>
          
      {/* char starts */}
     {/* <div className='piechart'>
      <PieChart
        data={[
          { title: 'One', value: 10, color: '#E38627' },
          { title: 'Two', value: 15, color: '#C13C37' },
          { title: 'Three', value: 20, color: '#6A2135' },
        ]}
      />;
      </div> */}
      <div className="bar-chart-container">
          <h2>Leave Statistics</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={bar()} barsize = {100}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Legend />
              <Tooltip />
              <Bar dataKey="leave_taken" name="Leave Taken" fill="#ff9900" />
              <Bar dataKey="Annual_leave" name="Annual Leave" fill="#00FFFF" />
              <Bar dataKey="Sick_leave" name="Sick Leave" fill="#82ca9d" />
              <Bar dataKey="Bereavement_leave" name="Bereavement Leave" fill="#FFFFFF" />
              <Bar dataKey="Maternity _leave" name="Maternity  Leave" fill="#808000" />
              <Bar dataKey="Paternity_leave" name="Paternity Leave" fill="#8884d8" />
              <Bar dataKey="Study_leave" name="Study Leave" fill="#ffc658" />
              <Bar dataKey="Total_leave" name="Total Leave" fill="#f50057" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>
        {/* char ends */}

    </div>
    </div>
    </TokenProvider>
    
  );
};


export default Dashboard;
