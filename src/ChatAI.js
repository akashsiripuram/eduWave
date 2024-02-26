// import { config } from "dotenv";
// import React from "react";

// const ChatAI=()=>{
//     // config();
//     // const key=process.env.REACT_APP_API_KEY;

//     return (
//         <div>
//             Hello
//         </div>
        
        
//     )
// }


// export default ChatAI;


// console.log(process.env.REACT_APP_API_KEY)
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {MainContainer,ChatContainer,Message,MessageList,MessageInput,TypingIndicator} from '@chatscope/chat-ui-kit-react'
import { useState } from 'react';

const API_KEY="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";

function ChatAI(){
    const [typing,setTyping]=useState(false);
    const [messages,setMessages]=useState(
        [
            {message:"Hello, I am ChatAI!",
            sender:"ChatAI"
        }
        ]
    );
    const handleSend=async (message) =>{
        const newMessage={
            message:message,
            sender:"user",
            direction:"outgoing"
        }

        const newMessages=[...messages,newMessage];

    setMessages(newMessages);



    setTyping(true);
    //process message
    await processMessageToChatAI(newMessages);
    }

    async function processMessageToChatAI(chatMessages){
        let apiMessages=chatMessages.map((messageObject)=>{
            let role="";
            if(messageObject.sender=="chatAI"){
                role="assistant"
            }
            else{
                role="user"
            }
            return {role:role, content:messageObject.message}
        });
        const systemMessage={
            role:"system",
            content:"Explain all concepts like I am 10 years old"
        }
        const apiRequestBody={
            "model":"gpt-3.5-turbo",
            "messages":[
                systemMessage,
                ...apiMessages
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",{
            method:"POST",
            headers:{
                
                "Authorization":"Bearer "+API_KEY,
                "Content-Type":"application/json",
            },
            body:JSON.stringify(apiRequestBody)
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            console.log(data);
            console.log(data.choices[0].message.content);
            setMessages(
                [...chatMessages,{
                    message:data.choices[0].message.content,
                    sender:"chatAI",
                    
                }]
            );
            setTyping(false);
        })
    }   

    // style={{position:"relative",height:"88vh",width:"700px"}}


    return(

        <div className="ChatAI">
            <div className="h-[88vh] flex justify-center items-center bg-gray-100" >
                <MainContainer >
                    <ChatContainer>
                        <MessageList
                        scrollBehavior='smooth'
                        typingIndicator={typing?<TypingIndicator content="ChatAI  is typing"/>:null}
                        >
                            {messages.map((message,i) =>{
                                return <Message key={i} model={message}/>
                            })}
                        </MessageList>
                        <MessageInput placeholder='Type message here' onSend={handleSend}/>
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    )
}

export default ChatAI;
