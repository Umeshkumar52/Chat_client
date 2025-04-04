import React, { useEffect, useRef, useState } from 'react'
import socket from '../socket'
import { MdCallEnd } from 'react-icons/md'
import { FaVideo } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {BiSolidVolumeFull} from 'react-icons/bi'
export default function AudioCall() {
    const myUserName=useSelector(state=>{return state.auth.user.UserName})  
    const {state}=useLocation()
    const targetUser=state;   
    const navigate=useNavigate(); 
    const [peerConnection,setPeerConnection]=useState(null)
    const localVideoRef=useRef()
    const remoteVideoRef=useRef()
    const connectionRef=useRef()
    const[call,setCall]=useState({
        isRecievingCall:false,
        callerId:null,
        targetId:null,
        signalData:null,
    })
    const[mainCallingVideo,setMainCallingVideo]=useState(true)
    const[callAccepted,setCallAccepted]=useState(false)
    const[callRejected,setCallRejected]=useState(false)
   const startCall=async()=>{
    const pc=new RTCPeerConnection({
        iceServers:[
            {
                urls:"stun:stun.l.google.com:19302"
            }
        ]
    })
    pc.ontrack=(event)=>{
        remoteVideoRef.current.srcObject=event.streams[0]
       };
    //    handle offer

       pc.onicecandidate=(event)=>{
        if(event.candidate){
            socket.emit("candidate",{
                candidate:event.candidate,sender:myUserName,target:targetUser.UserName
            })
        }
    }
navigator.mediaDevices.getUserMedia({audio:true,video:true})
.then(stream=>{
localVideoRef.current.srcObject=stream
stream.getTracks().forEach(track=> pc.addTrack(track,stream))
pc.createOffer().then((offer)=>{
    console.log("clientOffer",offer);    
    pc.setLocalDescription(offer)
    socket.emit("offer",offer)
    socket.emit('callUser',{to:targetUser,signalData:offer,callerId:myUserName})
})
});
connectionRef.current=pc
setPeerConnection(pc)
   }
   async function EndCall() {    
    const localStream=localVideoRef.current.srcObject
    if(localStream){
        localStream.getTracks().forEach((track)=>track.stop())
        localVideoRef.current.srcObject=null
        remoteVideoRef.current.srcObject=null
        if(peerConnection){
            peerConnection.close()
        }
        socket.emit('endCall',{target:targetUser.UserName})
        navigate(-1)
    }
   
   }
   async function AcceptCall() {
     setCallAccepted(true)
     const peer=new RTCPeerConnection()
     peer.ontrack((event)=>{
     remoteVideoRef.current.srcObject=event.streams[0];
     peer.addStrem((localVideoRef.current.srcObject))
     peer.setRemoteDescription(new RTCSessionDescription(call.signalData))
     peer.createAnswer().then((answer)=>{
     socket.emit('acceptCall',{to:call.callerId,signalData:answer})
     connectionRef.current=peer
     })
    })

   }
   function rejectCall(){
    setCallRejected(true)
    socket.emit('rejectCall',{to:call.callerId,})
    setCall({})
   }
   useEffect(()=>{
    socket.on("offer",async(data)=>{
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer))
        const answer=await peerConnection.createAnswer()
        await peerConnection.setLocalDesription(answer)
        socket.emit("answer",{
           answer,target:data.sender,sender:data.target
        });
    
       })
       socket.on('answer',async(answer)=>{
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
       })
       socket.on("candidate",async(candidate)=>{
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
       })
    socket.on('endCall',()=>{
        EndCall()
    })
    // /this work here in place of offer
    socket.on('incomingCall',async({signalData,callerId})=>{
        setCall({
            isRecievingCall:true,
            callerId,
            signalData
        })
        window.confirm(`${callerId} is calling...`)
    })
    socket.on('acceptCall',(signal)=>{
       connectionRef.current.setRemoteDescription(new RTCSessionDescription(signal))
    })
    socket.on('rejectCall',()=>{
        setCall({
           isRecievingCall:false,
           signalData:null,
           callerId:null,
           targetId:null
        })
    })
   },[socket])
   useEffect(()=>{
    setTimeout(()=>{
        startCall()
    },1000)
   },[])
   return(
    <div className='relative items-center justify-center w-full h-screen'>
      {AcceptCall?
        <video className={!mainCallingVideo?'mainCallingVideo':'partialCallingVideo'} ref={remoteVideoRef} autoPlay/>:""
        }
      <video ref={localVideoRef} autoPlay muted className={mainCallingVideo?'mainCallingVideo':'partialCallingVideo'}/>
      <div className='fixed w-full bottom-4 text-2xl flex justify-evenly'>
       <div className='bg-slate-400 p-2 rounded-full'>
       <FaVideo/>
       </div>
        <div onClick={EndCall} className='bg-red-600 p-2 rounded-full text-white'>
        <MdCallEnd/>
        </div>
      </div>
    </div>
  )
}