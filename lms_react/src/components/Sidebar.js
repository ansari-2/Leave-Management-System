import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css' 
import './Sidebar.css';

function Sidebar() {
  return (
    <>
    <div className="container-fluid">
			<div className="row flex-nowrap">
				<div className="col-auto col-md-3 col-xl-8 px-sm-2 px-0 bg-dark">
					<div className='sidebar-menus'>
						<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
							<a href="" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
								<span className="fs-5 fw-bolder d-none d-sm-inline">Employee Dashboard</span>
							</a>
							<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
								<li>
									<Link to="/admin" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
										<i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Admin</span> </Link>
								</li>
								<li>
									<Link to="/apply" className="nav-link px-0 align-middle text-white">
										<i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Apply Leave</span> </Link>
								</li>
								<li>
									<Link to="/leavestatus" className="nav-link px-0 align-middle text-white">
										<i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Leave Status</span></Link>
								</li>
								<li >
								{/* onClick={handleLogout}> */}
								<Link to="/logout" className="nav-link px-0 align-middle text-white">
										<i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col p-0 m-0">
					<div className='p-2 d-flex justify-content-center shadow'>
						<h4>Leave Management System</h4>						
					</div>
					{/* <Outlet /> */}
				</div>
			</div>
		</div>
	
    </>
  )
}

export default Sidebar