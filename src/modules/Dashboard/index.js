import React, { useEffect } from "react";
import Avatar from "../../Assets/Avatar.svg";
import { useSelector } from "react-redux";
import { useState } from "react";

const ChatSideBar=()=>{
    const { teacher } = useSelector((state) => state.teacher);
    const teacherName=teacher.name;
    const  [conversations,setConversations]=useState([]);
    const [messages,setMessages]=useState({});
    console.log('Conversations',conversations);
    console.log('User',teacher);
    
    useEffect(() => {
        const fetchConversations = async () => {
          try {
            const res = await fetch(`http://localhost:5001/dashboard/teacher/inbox/${teacher._id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const resData = await res.json();
            // console.log(resData);
            setConversations(resData);
            // Handle response
          } catch (error) {
            console.error('Error fetching conversations:', error);
          }
        };

      
        fetchConversations();
      }, []);

     
    // const [user,setUser]=useState(JSON.parse(localStorage.getItem('')));
   
    const fetchMessages= async (conversationId,teacher) => {
        try {
            const res = await fetch(`http://localhost:5001/dashboard/teacher/message/${conversationId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              
            });
            const resData = await res.json();

            console.log("resData",resData);
            // console.log("receiver:",teacher);
            setMessages({messages:resData,receiver:teacher});
            // Handle response
          } catch (error) {
            console.error('Error fetching conversations:', error);
          }
    }
    return(
        <div className="w-screen flex">
            <div className="w-[25%]  h-screen bg-primary">
                <div className="flex justify-center items-center my-8">
                    <div className="border border-primary p-[2px] rounded-full"><img src={Avatar} width={75} height={75}/></div>
                    <div className="ml-8">
                        <h3 className="text-2xl">{teacherName}</h3>
                        <p className="text-lg font-light">My Account</p>
                    </div>
                </div>
                <hr></hr>
                <div className="mx-14 mt-10">
                    <div className="text-primary text-lg">Messages</div>
                    {   conversations.length >0 ?
                        conversations.map(({conversationId,user})=>{
                            // console.log("Conversation >>",conversation);
                            return(
                                <div className='flex items-center  py-8 border-b border-b-gray-300 ' >
                                    <div className='flex items-center cursor-pointer' onClick={()=>fetchMessages(conversationId,teacher)}>
                                        <div><img src={Avatar} width={50} height={50} className="rounded-full p=[2px] border border-purple-400"/></div>
                                        <div className='ml-8'>
                                            <h3 className='text-xl font-semibold'>{user.name}</h3>
                                            <p className='text-lg font-light text-gray-600'>{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                
                            )
                        }):<div className="">NO converasjai</div>
                        
                    }
                </div>
            </div>
            <div className="w-[50%] h-screen bg-white flex flex-col items-center">
                {
                    messages?.receiver?.name &&
                    <div className="w-[75%] bg-secondary h-[80px] mt-14 rounded-full flex items-center px-14 shadow-lg">
                        <div>
                            <img className="cursor-pointer" src={Avatar} width={60} height={60}></img></div>
                            <div className="ml-6 mr-auto">
                            <h3 className='text-lg'>{messages?.receiver?.name}</h3>
                            <p className='text-sm font-light text-gray-600'>{messages?.receiver?.email}</p>
                            </div>
                            <div className="cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
  <path d="M15 9l5 -5" />
  <path d="M16 4l4 0l0 4" />
</svg>
                            </div>
                </div>
                }
                
                <div className="h-75% w-full overflow-scroll shadow-sm">
                    <div className="p-14">
                        
                        {
                            messages?.messages?.length >0?
                            messages.messages.map(({message,user: {id,name,email}={}})=>{
                                return(
                                    <div className={`max-w-[40%] rounded-b-xl p-4  text-white mb-6 ${id===teacher._id ? 'bg-black rounded-tl-xl ml-auto':'bg-black rounded-tr-xl'} `}>
                                            {message}
                                        </div>
                                )
                                
                                    
                                
                                
                            }):<div className="text-center text-lg font-semibold mt-24">No messages</div>
                        } 
                    </div>
                </div>
                <div className="p-14 w-full flex items-center">
                    <input placeholder="Type a message..." className="w-[75%] p-4 border-0 shadow-md rounded-full bg-light focus:border-0 outline-none"  />
                    <div className="ml-4 p-2 cursor-pointer bg-light rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M10 14l11 -11" />
                            <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
                        </svg>
                    </div>
                    <div className="ml-4 p-2 cursor-pointer bg-light rounded-full" >
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 5l0 14" />
                            <path d="M5 12l14 0" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="w-[25%] h-screen bg-light"></div>
        </div>
    )
}
export default ChatSideBar;