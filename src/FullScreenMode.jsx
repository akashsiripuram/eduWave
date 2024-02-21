import React, { useEffect } from 'react';

const FullScreenMode = () => {
  const enableFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'f') {
        enableFullScreen();
        document.removeEventListener('keydown', handleKeyPress);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div>
      {/* <h1>Welcome to Full-Screen Mode!</h1> */}
      {/* <p>Press the "F" key to enter full screen.</p> */}
    </div>
  );
};

export default FullScreenMode;
