import { Outlet, Navigate } from 'react-router-dom'


const PrivateRoute = () => {
    let user = localStorage.getItem('authToken') || false
    console.log(user)
    return(
          user ?  <Outlet/> : <Navigate to="/"/> 
        )
}

export default PrivateRoute;