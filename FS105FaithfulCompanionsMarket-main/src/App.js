import React, { useState, useEffect } from 'react'; // Import React, useState, and useEffect
import { Outlet } from 'react-router-dom'; // Import Outlet
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import Preloader2 from './components/Preloader2'; // Import Preloader2 component

function App() {
  const [isLoading, setIsLoading] = useState(true); // Define isLoading state

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after 2000ms
    }, 2000);
  }, []);

  return (
    <div className="App">
   
      {isLoading ? (
        <Preloader2 /> // Display Preloader2 while isLoading is true
      ) : (
        <>
          <Outlet /> {/* Render nested child routes */}
          <ToastContainer /> {/* Render ToastContainer for displaying notifications */}
        </>
      )}
     
    </div>
  );
}

export default App;
