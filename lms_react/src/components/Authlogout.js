import { useHistory } from 'react-router-dom';



export const logout = async (authToken, history) => {
    console.log('Token:', authToken);
    try {
      const response = await fetch('http://localhost:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Authorization': 'Token ' + authToken, // Replace with the user's actual token
        
        },
      });
  
      if (response.status === 200) {
        console.log('Logout successful');
        localStorage.removeItem('authToken'); // Remove authToken only
        localStorage.removeItem('token'); // Remove authToken only
        history("/");
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  