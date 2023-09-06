import React, { useState, useEffect }  from 'react';
import Sidebar from './Sidebar';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [leavesByMonth, setLeavesByMonth] = useState(initializeLeavesByMonth());

  function initializeLeavesByMonth() {
    const months = [
      "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug", "Sep",
      "Oct", "Nov", "Dec"
    ];
    const initialData = {};
    months.forEach(month => {
      initialData[month] = Math.floor(Math.random() * 10); // Dummy data
    });
    return initialData;
  }

  const transformedData = Object.entries(leavesByMonth).map(([month, count]) => ({
    name: month,
    days: count,
  }));

  const data = [
    { name: 'Total Leaves', value: 20 },
    { name: 'Casual Leaves', value: 8},
    { name: 'Earned Leaves', value: 12  },
    { name: 'Maternity Leaves', value: 5 },
    { name: 'Paternity Leaves', value: 3 },
    { name: 'Study Leaves', value: 4  },
    { name: 'Brewment Leaves', value: 2  },
  ];

  const COLORS = [ '#1AA260','#0088FE',  '#2F0909', '#00BFFF','	#FA2A55','#F6BE00','#00008B' ];





  return (
      <>
      
    <div className='parent1'>
        <div className='child1'>
      <Sidebar />
        </div>
        <div className='child2'>
        <div className='con'>
      <div  className='emp'>
        {/* Dummy employee data */}
        <div className="employee-info">
            <div className="employee-avatar">
              A
            </div>
            <div className="employee-details">
              <p className="employee-name">John Doe</p>
              <p className="employee-id">Employee ID: 123</p>
            </div>
        </div>
      </div>
      
      {/* Dummy leaves data */}
      <div className='leav'>
        <div className="Leaves-info">
          <div className="leaves-details">
            <p>Total Leaves</p>
            <p className="noofleavs">10</p>
          </div> 
        </div>
        <div className="Leaves-info">
          <div className="leaves-details">
            <p>Casual Leaves</p>
            <p className="noofleavs">5</p>
          </div> 
        </div>
        <div className="Leaves-info">
          <div className="leaves-details">
            <p>Earned Leaves</p>
            <p className="noofleavs">5</p>
          </div> 
        </div>
      </div>
    </div>
    
    <div className='con-chart'>
      <div className='chart-con1'>
        <p>Leave Statistics</p>
        <BarChart
          width={600}
          height={300}
          barCategoryGap={30}
          data={transformedData}
          margin={{
            top:10,
            right: 10,
            left: 5,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis max={30}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="days" fill= "#1338be" />
        </BarChart>
      </div>
      <span className='span'> </span>
      <div className='chart-con2'>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx={120}
            cy={120}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Label/>
        </PieChart>
        <div className='lea'>
          {/* Dummy legend data */}
          <p style={{color:'#1AA260'}}><i style={{color:'#1AA260',fontSize:'28px'} } class="bi bi-dot"/>Total Leave</p>
          <p style={{color:'#0088FE'}}><i style={{color:'#0088FE',fontSize:'28px'} } class="bi bi-dot"/>Casual Leave</p>
          <p style={{color:'#2F0909'}}><i style={{color:'#2F0909',fontSize:'28px'} } class="bi bi-dot"/>Earned Leave</p>
          <p style={{color:'#00BFFF'}}><i style={{color:'#00BFFF',fontSize:'28px'} } class="bi bi-dot"/>Maternity Leaves</p>
          <p style={{color:'#FA2A55'}}><i style={{color:'#FA2A55',fontSize:'28px'} } class="bi bi-dot"/>Paternity Leaves</p>
          <p style={{color:'#F6BE00'}}><i style={{color:'#F6BE00',fontSize:'28px'} } class="bi bi-dot"/>Study Leaves</p>
          <p style={{color:'#00008B'}}><i style={{color:'#00008B',fontSize:'28px'} } class="bi bi-dot"/>Bereavement Leaves</p>
        </div>
      </div>
    </div>
    <div className=' con-chart1'>
      <div className='chart-con1'>
        <p>Leave Requests</p>
        
        <table className="leave-table">
          <thead>
            <th>Type</th>
            <th>Duration</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th> <Link to='/list' style={{color:'Blue'}}> View All</Link> </th>
          </thead>
         
          {/* Dummy leave requests data */}
          <tbody >
            <tr>
              <td>Casual Leave</td>
              <td>2 Day(s)</td>
              <td>Vacation</td>
              <td>2023-08-01</td>
              <td>2023-08-02</td>
            </tr>
            {/* Add more dummy data as needed */}
          </tbody>
        </table>
      </div>
    </div>
        </div>
    </div>
    

    
    </>
  )
}

export default Dashboard;
