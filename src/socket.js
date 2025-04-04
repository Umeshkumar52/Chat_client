import { io } from "socket.io-client";
// const url="http://localhost:5002"
const url="https://chat-backend-mmyl.onrender.com"
    const socket=io(url,{
        autoConnect:false,
        transports:['websocket']
    })
export default socket;
