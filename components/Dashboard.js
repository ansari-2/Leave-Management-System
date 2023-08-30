import {React,useState, useEffect} from 'react';
import './Dashboard.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts';
import Navbar from './Navbar';
import { PieChart } from 'react-minimal-pie-chart';
import { TokenProvider,useToken } from './TokenContext';







const Dashboard = () => {

  const [leavedata, setLeaveData] = useState([]);
  const [leavetypedata, setLeaveTypeData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [empleavedata, setEmpLeaveData] = useState(null);
  const [employeeId, setEmployeeId] = useState('');
  const { token } = useToken();
  
 
  


  useEffect(() => {
      fetchEmployees();
      fetchleaves();
      // fetchleave_types();
      // employee();
    }, []);

    const fetchEmployees = async () => {
  
        const response = await axios.get('http://localhost:8000/lms/employee/');
        const employees = response.data
        const emp = employees.find((employee) => employee.emp_name === token.username)
        console.log(token.username)
        const employee = await axios.get(`http://localhost:8000/lms/employee/update/${emp.id}`);
        setSelectedEmployee(employee.data);
        console.log(selectedEmployee)
        const employee_leaves = await axios.get('http://localhost:8000/lms/leave_type/');
        const leavetypes = employee_leaves.data
        setLeaveTypeData(leavetypes);
        const requested_leave = leavetypes.filter(leave => leave.employee === emp.id)
        setEmpLeaveData(requested_leave) 

    };

    // const employee = async () => {
    //   const emp = employees.find((employee) => employee.emp_name === token.username)
    //   console.log(employees)
    //   try {

        
    //   } catch (error) {
    //     console.error('Error fetching employees:', error);
    //     console.log(selectedEmployee)
    //   }
    // }

    const fetchleaves = async () => {
      try {
        const response = await axios.get('http://localhost:8000/lms/apply/');
        setLeaveData(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };


    // const handleEmployeeChange = async (e) => {
    //   const selectedEmpId = e.target.value;
    //   setEmployeeId(selectedEmpId);
    //   setSelectedEmployee(employees.find((employee) => employee.id === parseInt(selectedEmpId)));
     
    // };

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
        <div className="nav-bar">
        <Link to="/" className="nav-item">Dashboard</Link>
        <Link to="/admin" className="nav-item">Admin</Link>
        <Link to="/apply" className="nav-item">Apply Leave</Link>
        <Link to="/leavestatus" className="nav-item">Leave Status</Link>
        <div className="navbar-title">Leave Management System</div>
        <div className='logout-div'>
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
            {/* <tr>
              <td className="info-label">Employee Name</td>
              <td className="info-value">Rahul</td>
            </tr>

            <tr>
              <td className="info-label">Employee ID</td>
              <td className="info-value">86215</td>
            </tr>  

            <tr>
              <td className="info-label">Designation</td>
              <td className="info-value">Software Engineer</td>
            </tr> */}

            
          </tbody>
        </table>
        <br></br>
        <br></br>
                      {/* <div className='leave-tables'> */}
      {/* leave-table1 removed */}
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
