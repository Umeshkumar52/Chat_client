import React, { useState, useEffect } from "react";
import "./App.css";
import { useSelector } from "react-redux";
import MessagerUSerList from "./components/MessagerUSerList";
import { useNavigate } from "react-router-dom";
import socket from "./socket";
import Chat from "./Chat";
export default function ChatApp() {   
  const state=useSelector((state)=>{return state.auth.user})
  const navigate=useNavigate()
  const[selectedUser,setSelectedUser]=useState(null)
  const [onlineUsers, setOnlineUsers] = useState([]);
  window.onbeforeunload=()=>{
    socket.emit("offline",(data)=>{
    })
  }
  useEffect(() => {
      socket.on("users", (users) => {
      setOnlineUsers({ ...onlineUsers,users});
    });
  }, [socket]);  
 
  return (
        <div className="mainPanel w-full h-screen flex overflow-hidden bg-black text-black">
       {/* User Panel */}
        <div className="w-full h-screen md:w-[35%] lg:w-[25%] flex flex-col">
           <div className="flex gap-2 text-white p-4 flex-col">
            <div className="flex items-center gap-4">
            <h1 className='font-bold text-transparent bg-clip-text text-3xl bg-gradient-to-r from-[#0846fe] from-25% to-[#ff0505]'>Messanger</h1>
            </div>
            <h2 className="text-white text-sm font-bold">Contacts</h2>
           </div>
          <MessagerUSerList setSelectedUser={setSelectedUser}/>
       </div>
       {/* Chat part */}
          <div className="w-full md:w-[65%] lg:w-[75%] hidden md:block ">
          {selectedUser?
          <Chat key={selectedUser._id} recieverUser={selectedUser}/>
          :
          <div className="lg:w-full flex flex-col px-10 h-screen gap-6 w-full justify-center items-center">
            <h1 className="text-[#2d2e2e] text-3xl md:text-4xl lg:text-6xl  font-semibold"> Eangager Chat for Window</h1>
            <h2 className="text-[#a2a5a2] text-xl md:text-2xl lg:text-4xl">Send and recieve message without keeping onlien your phone.
               Use chat app upto 4 linked devices and one phone at the same time.
            </h2>
         </div>}
          </div>
        </div>
  );
}
