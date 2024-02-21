import React, { useEffect } from 'react';

const TabBlocker = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Cancel the event
      event.preventDefault();
      // Chrome requires returnValue to be set
      event.returnValue = '';

      // Redirect back to your website
      window.location.href = 'http://localhost:3000/'; // Change this to your desired URL
    };

    // Add event listener when component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
};

export default TabBlocker;
