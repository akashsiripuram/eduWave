import react from "react";
import {useParams} from "react-router-dom";
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import {v4} from "uuid";

function Room(){
    const {roomId}=useParams();

    async function meetingUI(element){
        const appId=297960104;
        const serverSecret="f5a3dd031e959cbe6ffe15f1ea65c817";
        const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            roomId,
            v4(),
            "eduWave"
        );

        const ui=ZegoUIKitPrebuilt.create(kitToken);

         ui.joinRoom({
            container:element,
            scenario:{
                mode:ZegoUIKitPrebuilt.VideoConference
            }
        })
    }
    return(
    <>
        <h2 style={{textAlign:"center"}}>Room {roomId}</h2>
        <div ref={meetingUI}></div>

    </>);
}

export default Room;

