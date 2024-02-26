// import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// function ScreenTime() {
//   const [open, setOpen] = useState(true)
//   const [totalTime, setTotalTime] = useState(0);
//   const [activeTime, setActiveTime] = useState(0);
//   const SCREEN_TIME_LIMIT = 60; // 10 seconds for testing
//   const BREAK_INTERVAL = 20; // 5 seconds for testing

//   // Function to format time in hours, minutes, and seconds
//   function formatTime(seconds) {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;

//     const formattedHours = String(hours).padStart(2, '0');
//     const formattedMinutes = String(minutes).padStart(2, '0');
//     const formattedSeconds = String(remainingSeconds).padStart(2, '0');

//     return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTotalTime((prevTotal) => prevTotal + 1);
//       setActiveTime((prevActive) => prevActive + 1);

//       // Check if it's time for a break
//       if (activeTime >= SCREEN_TIME_LIMIT) {
//         toast.info('You have reached your screen time limit. Take a break!', {
//           autoClose: 5000,
//         });
//         setActiveTime(0);
//       } else if (activeTime % BREAK_INTERVAL === 0 && activeTime !== 0) {
//         toast.info('It\'s time for a short break!', {
//           autoClose: 5000,
//         });
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [activeTime]);

//   const handleReset = () => {
//     setTotalTime(0);
//     setActiveTime(0);
//   };

//   return (
//     <div>
//       {/* <h1>Responsible Technology Usage</h1>
//       <div>
//         <h2>Total Time Spent: {formatTime(totalTime)}</h2>
//         <div>
//           <p>Active Time: {formatTime(activeTime)}</p>
//           <button onClick={handleReset}>Reset Time</button>
//         </div>
//       </div>
//       <div>
//         <h3>Tips for Balanced Use:</h3>
//         <ul>
//           <li>Take regular breaks to rest your eyes and stretch.</li>
//           <li>Avoid prolonged screen time by scheduling offline activities.</li>
//           <li>Set specific times for using devices and stick to them.</li>
//           <li>Use apps that remind you to take breaks and track your usage.</li>
//         </ul>
//       </div> */}
      
//       <ToastContainer />
//     </div>
//   );
// }

// export default ScreenTime;


import React, { useState, useEffect, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Transition, Dialog } from '@headlessui/react'; // Import Transition and Dialog
import { Link, useNavigate } from "react-router-dom";

function ScreenTime() {
  const [totalTime, setTotalTime] = useState(0);
  const [activeTime, setActiveTime] = useState(0);
  const SCREEN_TIME_LIMIT = 1000; // 10 seconds for testing
  const BREAK_INTERVAL = 500; // 5 seconds for testing
  const [open, setOpen] = useState(true);

  // Function to format time in hours, minutes, and seconds
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTime((prevTotal) => prevTotal + 1);
      setActiveTime((prevActive) => prevActive + 1);

      // Check if it's time for a break
      if (activeTime >= SCREEN_TIME_LIMIT) {
        toast.info('You have reached your screen time limit. Take a break!', {
          autoClose: 5000,
        });
        setActiveTime(0);
      } else if (activeTime % BREAK_INTERVAL === 0 && activeTime !== 0) {
        toast.info('It\'s time for a short break!', {
          autoClose: 5000,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeTime]);

  const handleReset = () => {
    setTotalTime(0);
    setActiveTime(0);
  };

  return (
    <div>
      
      <ToastContainer />
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <Link to="/">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button></Link>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Scrren Time
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <h1>Responsible Technology Usage</h1>
      <div>
        <h2>Total Time Spent: {formatTime(totalTime)}</h2>
        <div className="center">
          <p>Active Time: {formatTime(activeTime)}</p>
          <button className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20" onClick={handleReset}>Reset Time</button>
        </div>
      </div>
      <div>
        
      </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default ScreenTime;