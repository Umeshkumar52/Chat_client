import { memo, useCallback, useEffect, useRef, useState } from "react";
import socket from "../socket";
import { MdCallEnd } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoIosMic, IoMdMicOff } from "react-icons/io";
import {
  setAnswer,
  setCallEnd,
  setIceCandidate,
  setLocalStream,
  setPeerConnection,
  setIncomingCall,
  setRemoteStream,
  setOffer,
  setAcceptCall,
} from "../reducers/audioCallReducer";
 function AudioCall({targetUser,callMessageHandaller}) {
     const dispatch = useDispatch();
  const {
    localStream,
    remoteStream,
    peerConnection,
    callAccept,
    isCallActive,
    type,
    calleeUser,
    offer,
    callerUser,
    callStatus,
  } = useSelector((state) => state.globalyCall);
  const { UserName, avatar } = useSelector((state) => {
    return state.auth.user;
  });
  const localAudioRef = useRef(null);
  const remoteAudiooRef = useRef(null);
  const [streams, setStream] = useState(null);
  const [micOn, setMicOn] = useState(true);
  function initialLocalStream(pc) {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
      })
      .then((stream) => {
        setStream(stream);
        stream.getTracks().forEach((track) => pc?.addTrack(track, stream));
        dispatch(setLocalStream(stream));
      });
  }
  function createPeerConnection() {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });
    dispatch(setPeerConnection(pc));
    initialLocalStream(pc);
    pc.onicecandidate = (event) => {
      console.log(event);
      if (event.candidate) {
        socket.emit("candidate", {
          candidate: event.candidate,
          callerId: UserName,
          calleeId: targetUser.UserName,
        });
        setIceCandidate(event.candidate);
      }
    };
    pc.ontrack = (event) => {
        const remoteAudio=new Audio()
      remoteAudio.current.srcObject = event.streams[0];
      remoteAudio.srcObject=event.streams[0]
      remoteAudio.play()
      dispatch(setRemoteStream(event.streams[0]));
    };
    return pc;
  }
  function callEnd() {
    callMessageHandaller({
      message: "Voice Call",
      msg_type: "call",
      callDuration: "No answer",
    });
    socket.emit("call-end", calleeUser.UserName);
    dispatch(setCallEnd());
  }
  const startCall = useCallback(async () => {
    const pc = createPeerConnection();
    const offer = await pc.createOffer();
    pc.setLocalDescription(offer);
    socket.emit("offer", {
      offer: offer,
      calleeUser: targetUser,
      callerUser: { UserName, avatar },
      type,
    });
    dispatch(setOffer(offer));
    setTimeout(() => {
      if (callStatus == "outgoing" && !callAccept) {
        callEnd();
      }
    }, 60000);
  });
  const acceptIncomingCall = useCallback(async () => {
    const pc = createPeerConnection();
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    dispatch(setAnswer(answer));
    socket.emit("answer", {
      answer: answer,
      callerId: callerUser.UserName,
    });
    dispatch(setIncomingCall({ isCallActive: true }));
    dispatch(setAcceptCall(true));
  });

  function callMuteHandler() {
    if (streams) {
      streams.getAudioTracks()[0].enabled = !micOn;
      setMicOn((prev) => !prev);
    }
  }
  useEffect(() => {
    //  Offer and call-end is listening at app.js file to listen globaly
    socket.on("answer", async (answer) => {
      if (peerConnection) {
        await peerConnection.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
        dispatch(setAnswer(answer));
      }
    });
    socket.on("candidate", async (candidate) => {
      if (peerConnection) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
      dispatch(setIceCandidate(candidate));
    });
  }, [socket]);
  useEffect(() => {
    if (localAudioRef.current && localStream) {
      localAudioRef.current.srcObject = localStream;
    }
    if (remoteAudiooRef.current && remoteStream) {
      remoteAudiooRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);
  useEffect(() => {
    setTimeout(() => {
      if (callStatus == "outgoing" && isCallActive) {
        startCall();
      } else if (callStatus == "incoming") {
        acceptIncomingCall();
      }
    }, 600);
  }, [isCallActive, callAccept]);
  console.log(calleeUser,callerUser);
  
   return(
    <div className='fixed top-0 md:left-0 bg-white text-black w-full h-screen flex flex-col justify-between pt-[2rem] pb-[2rem] items-center'>
      <div className="flex flex-col items-center gap-5">
      <audio  ref={localAudioRef} autoPlay muted />
      <audio ref={remoteAudiooRef} autoPlay/>
      {!callAccept&&<div className=''>
      <h2 className=' text-2xl font-semibold'>{calleeUser?.calleeId}</h2>
      <h4 className='text-base font-medium flex justify-center'>Calling...</h4>
      </div>} 
     <img className='border-2 border-black size-24 rounded-full' src={calleeUser?.avatar}/>
     </div>
      <div className='w-[300px] px-2 space-x-[5rem] text-black bottom-4 text-2xl flex'>
       <div className='bg-slate-200/80 p-2 rounded-full'>
     <FaVideo/>
       </div>
       <div onClick={callMuteHandler} className='bg-slate-200/80 p-2 rounded-full '>
       {micOn?<IoIosMic/>:<IoMdMicOff/>}
        </div>
        <div onClick={callEnd} className='bg-red-600 p-2  rounded-full text-white'>
        <MdCallEnd/>
        </div>
        </div>
    </div>
  )
} 
export default memo(AudioCall)
  
