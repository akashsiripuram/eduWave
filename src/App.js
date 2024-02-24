import "./App.css";
import Navbar from "./components/shared/Navbar";
import FullScreenMode from "./FullScreenMode.jsx";
import TabBlocker from './TabBlocker';
import Canvas from "./Canvas.js";
import ScreenTime from './ScreenTime.js';

// import Home from "./Home.js"
import { useNavigate,Routes,Route } from "react-router";
import Room from "./Room.js";
import { useState } from "react";

function App() {
  return (
    <>
    {/* <h1>Welcome to Full-Screen Mode!</h1> */}
      
      
      <div className="">
        <Navbar />
      </div>
      <FullScreenMode />
      <TabBlocker />
      
      {/* <Canvas /> */}
      <h1>Join meeting</h1>
      <ScreenTime/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/room/:roomId" element={<Room/>}></Route>
      </Routes>
    </>
  );
}
function Home(){
  const [roomId,setRoomId]=useState('');
  const navigate=useNavigate();
  function handleJoin(){
      navigate(`/room/${roomId}`);
  }
  return(
      <main>
         
          <input type="text"
          placeholder="Enter room id"
          value={roomId}
          onChange={(e)=>setRoomId(e.target.value)}/>
          <button onClick={handleJoin}>Join</button>
      
      </main>
  )
}

export default App;
