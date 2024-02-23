import "./App.css";
import Navbar from "./components/shared/Navbar";
import FullScreenMode from "./FullScreenMode.jsx";
import TabBlocker from './TabBlocker';
import Canvas from "./Canvas.js";

function App() {
  return (
    <>
    {/* <h1>Welcome to Full-Screen Mode!</h1> */}
      
      
      <div className="">
        <Navbar />
      </div>
      <FullScreenMode />
      <TabBlocker />
      
      <Canvas />
    </>
  );
}

export default App;
