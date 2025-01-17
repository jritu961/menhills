const checkUserLoginStatus = () => {
    // Check if user is logged in by looking for 'authToken' or 'userId' in localStorage
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      // If user is not logged in, set userId to undefined
      localStorage.setItem('userId', "undefined");
    }

    return userId; // Return the userId or undefined
  };
  
  // Usage example
  
  export default checkUserLoginStatus