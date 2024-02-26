import "./App.css";
import Navbar from "./components/shared/Navbar";
import FullScreenMode from "./FullScreenMode.jsx";
import TabBlocker from './TabBlocker';
import Canvas from "./Canvas.js";
import ScreenTime from './ScreenTime.js';
import { useState } from "react";
// import Home from "./Home.js"
import { useNavigate,Routes,Route } from "react-router";
import Room from "./Room.js";
import ChatAI from "./ChatAI.js";
import { Link } from "react-router-dom";


function App() {
 
  return (
    <>
      <div className="">
        <Navbar />
        
      </div>
      <FullScreenMode />
      {/* <div className="container">
      <Forms/> </div> */}
       
      <Routes>
        <Route path="/videoconference" element={<VideoConference/>}></Route>
        <Route path="/room/:roomId" element={<Room/>}></Route>
        <Route path="/whiteboard" element={<Canvas/>}></Route>
        <Route path="/screentime" element={<ScreenTime/>}></Route>
        <Route path="/chatai" element={<ChatAI/>}></Route>
        <Route path="/" element={<Home/>}></Route>
        

      </Routes>
    </>
  );
}
function Home(){
  return(
    <div>
      <div className="fixed bottom-4 right-4">
      <Link to="/ChatAI">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-wechat" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M16.5 10c3.038 0 5.5 2.015 5.5 4.5c0 1.397 -.778 2.645 -2 3.47l0 2.03l-1.964 -1.178a6.649 6.649 0 0 1 -1.536 .178c-3.038 0 -5.5 -2.015 -5.5 -4.5s2.462 -4.5 5.5 -4.5z" />
  <path d="M11.197 15.698c-.69 .196 -1.43 .302 -2.197 .302a8.008 8.008 0 0 1 -2.612 -.432l-2.388 1.432v-2.801c-1.237 -1.082 -2 -2.564 -2 -4.199c0 -3.314 3.134 -6 7 -6c3.782 0 6.863 2.57 7 5.785l0 .233" />
  <path d="M10 8h.01" />
  <path d="M7 8h.01" />
  <path d="M15 14h.01" />
  <path d="M18 14h.01" />
</svg></Link>
      
      </div>
    </div>
  )
}
function VideoConference(){
  const [roomId,setRoomId]=useState('');
  const navigate=useNavigate();
  function handleJoin(){
      navigate(`/room/${roomId}`);
  }
  function handleScreenTime(){
    navigate("/screentime")
  }
  return(
      <main>      
        <h1 style={{textAlign:"center"}}>Join meeting</h1>  
          <input type="text"
          placeholder="Enter room id"
          value={roomId}
          onChange={(e)=>setRoomId(e.target.value)}/>
          <button onClick={handleJoin}>Join</button>

      
      </main>
  )
}

export default App;
