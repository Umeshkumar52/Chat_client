import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  type: null,
  callStatus: null,
  localStream: null,
  remoteStream: null,
  peerConnection: null,
  answer: null,
  iceCandidate: null,
  offer: null,
  isCallActive: false,
  callISHidden: false,
  endCall: false,
  calleeUser: null,
  callerUser: null,
  onlineUser: [],
  callAccept: false,
};
const audioCallSlice = createSlice({
  name: "audioCall",
  initialState,
  reducers: {
    setStartCall: (state, action) => {
      state.type = action.payload.type;
      state.isCallActive = true;
      state.callStatus = "outgoing";
      state.calleeUser = action.payload.calleeUser;
      state.callerUser = action.payload.callerUser;
    },
    setIceCandidate: (state, action) => {
      state.iceCandidate = action.payload;
    },
    setOffer: (state, action) => {
      state.offer = action.payload;
    },
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
    setPeerConnection: (state, action) => {
      state.peerConnection = action.payload;
    },
    setAnswer: (state, action) => {
      state.answer = action.payload;
      state.callAccept = true;
    },
    setIncomingCall: (state, action) => {
      state.isCallActive = true;
      state.callStatus=action.payload.callStatus
      state.type = action.payload.type;
      state.callerUser = action.payload.callerUser;
      state.calleeUser = action.payload.calleeUser;
     
    },
    setAcceptCall: (state) => {
      state.callAccept = true;
    },
    setCallIsHidden: (state, action) => {
      state.callISHidden = action.payload;
    },
    setCallEnd: (state) => {
      state.localStream?.getTracks().forEach((track) => track.stop());
      state.remoteStream?.getTracks().forEach((track) => track.stop());
      state.peerConnection?.close();
      state.localStream = null;
      state.remoteStream = null;
      state.peerConnection = null;
      state.iceCandidate = null;
      state.isCallActive = false;
      state.callStatus = null;
      state.type = null;
      state.endCall = true;
      state.callAccept = false;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUser.push(...action.payload.map(Element=>Element.userName));
    },
  },
});
export const {
  setStartCall,
  setIceCandidate,
  setOffer,
  setRemoteStream,
  setPeerConnection,
  setAcceptCall,
  setAnswer,
  setCallIsHidden,
  setIsCallActive,
  setLocalStream,
  setCallType,
  setCallEnd,
  setIncomingCall,
  setOnlineUsers,
} = audioCallSlice.actions;
export default audioCallSlice.reducer;
