import { memo, useCallback, useEffect, useRef, useState } from "react";
import socket from "../socket";
import { MdCallEnd } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoIosMic, IoMdMicOff } from "react-icons/io";
import { BiSolidVideoOff } from "react-icons/bi";
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
function VideoCall({ targetUser, callMessageHandaller }){
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
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [streams, setStream] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [mainCallingVideo, setMainCallingVideo] = useState(true);
  function initialLocalStream(pc) {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        setStream(stream);
        localVideoRef.current.srcObject = stream;
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
      remoteVideoRef.current.srcObject = event.streams[0];
      dispatch(setRemoteStream(event.streams[0]));
    };
    return pc;
  }
  function callEnd() {
    callMessageHandaller({
      message: "Video Call",
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
      calleeUser,
      callerUser,
      type,
    });
    dispatch(setOffer(offer));
    setTimeout(() => {
      if (!callAccept) {
        callEnd();
      }
    },60000);
  });
  const acceptIncomingCall = useCallback(async () => {
    const pc = createPeerConnection();
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    dispatch(setAnswer(answer));
    socket.emit("answer", {
      answer: answer,
      callerId: callerUser.callerId,
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
  function cameraHandler() {
    if (streams) {
      streams.getVideoTracks()[0].enabled = !cameraOn;
      setCameraOn((prev) => !prev);
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
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);
  useEffect(() => {
    // setTimeout(() => {
      if (callStatus == "outgoing" && isCallActive) {
        startCall();
      } else if (callStatus == "incoming") {
        acceptIncomingCall();
      }
    // }, 600);
  }, [isCallActive, callAccept]); 
  return (
    <div className="fixed top-0 md:left-0 bg-white items-center overflow-hidden justify-center w-full h-screen">
      <video
        onClick={() => setMainCallingVideo(!mainCallingVideo)}
        ref={localVideoRef}
        autoPlay
        className={`${
          mainCallingVideo && callAccept
            ? "partialCallingVideo"
            : "mainCallingVideo"
        }`}
      />
      {remoteStream && (
      <video
        onClick={() => setMainCallingVideo(!mainCallingVideo)}
        autoPlay
        className={
          !mainCallingVideo ? "mainCallingVideo" : "partialCallingVideo"
        }
        ref={remoteVideoRef}
      />
       )}
      {!callAccept && (
        <div className="fixed text-black left-1/2 transform -translate-x-1/2 top-[3rem]">
          <h2 className=" text-2xl font-semibold">{calleeUser?.calleeId}</h2>
          <h4 className="text-base font-medium flex justify-center">
            Calling...
          </h4>
        </div>
      )}
      <div className="w-[300px] px-2 space-x-[5rem] fixed left-1/2 transform -translate-x-1/2 text-black bottom-4 text-2xl flex">
        <div
          onClick={cameraHandler}
          className="bg-slate-200/80 p-2 rounded-full"
        >
          {cameraOn ? <FaVideo /> : <BiSolidVideoOff />}
        </div>
        <div
          onClick={callMuteHandler}
          className="bg-slate-200/80 p-2 rounded-full "
        >
          {micOn ? <IoIosMic /> : <IoMdMicOff />}
        </div>
        <div
          onClick={callEnd}
          className="bg-red-600 p-2  rounded-full text-white"
        >
          <MdCallEnd />
        </div>
      </div>
    </div>
  );
}
export default memo(VideoCall);
