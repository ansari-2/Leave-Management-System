import React from 'react';
import { TokenProvider,useToken } from './TokenContext';
import {Link, useNavigate } from 'react-router-dom';

function Logout() {
  const { token } = useToken();
  const history = useNavigate(); 
  const handleLogout = async () => {
    try {
      const response = await fetch('https://lms-techp.uc.r.appspot.com/api/logout/', {
        method: 'POST',
        headers: {
          'Authorization': token.token, // Replace with the user's actual token
        },
      });

      if (response.status === 200) {
        console.log('Logout successful');
        history("/login");
        // Handle success, maybe clear token from state or local storage
      } else {
        console.error('Logout failed');
        // Handle failure, show an error message
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error, show an error message
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
