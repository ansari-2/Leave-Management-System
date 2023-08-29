import React from 'react';
import { TokenProvider,useToken } from './TokenContext';

function Logout() {
  const { token } = useToken();
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        headers: {
          'Authorization': `Token <your_token_here>`, // Replace with the user's actual token
        },
      });

      if (response.status === 200) {
        console.log('Logout successful');
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
