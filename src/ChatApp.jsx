import React, { useState, useEffect } from "react";
import socket from "./socket";
import "./App.css";
import UserList from "./UserList";
import Chat from "./Chat";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
export default function ChatApp() {
  const {state}=useLocation()  
  const [onlineUsers, setOnlineUsers] = useState();
  const [currentUser, setCurrentUser] = useState("");
  socket.auth = { userName: state.UserName };
    socket.connect();
    socket.on("connect",()=>{
      socket.emit("rooms",state.UserName);
    })
  socket.on("connect_error", (err) => {
    if (err.message) {
      console.log("error", err.message);
    }
  });
 function SelectedUser(data) {
    setCurrentUser(data);
    if(data){
   socket.emit("rooms", data);
    }
  } 
  useEffect(() => {
      socket.on("users", (users) => {
      setOnlineUsers({ ...onlineUsers,users});
    });
  }, [socket]);      
  return (
    // <div className="w-full">
        <div className="w-full mainPanel overflow-y-scroll flex">
          <div
            id="userPanel"
            className="overflow-y-scroll w-[20%] border-2 border-cyan-800 h-screen gap-4 bg-slate-200 text-black"
          >
            {onlineUsers
              ? onlineUsers.users.map((Element) => {
                  return (
                    <div
                      key={Element.userId}
                      onClick={() => {            
                        SelectedUser(Element.userName);
                       
                      }}
                      className="selectedUser px-3 relative w-full hover:bg-slate-300 cursor-pointer"
                    >
                      <h1 className="font-semibold hover:text-yellow-600">
                        {Element.userName}
                      </h1>
                      <div className="flex flex-col">
                        <div className=" w-2 h-2 bottom-1 absolute animate-pulse rounded-full bg-green-500"></div>
                        <h2 className="relative text-xs text-[#ff4848]">
                          Online
                        </h2>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
          <div className="w-[80%]">
         {currentUser?
         <Chat key={socket.id} socket={socket} user={state.UserName} currentUser={currentUser} />
          :<div className="flex flex-col px-10 h-screen w-full justify-center items-center">
            <h1 className="text-[#2d2e2e] text-2xl font-mono">Chat App for Window</h1>
            <h2 className="text-[#a2a5a2]">Send and recieve message without keeping onlien your phone.
               Use chat app upto 4 linked devices and one phone at the same time.
            </h2>
            
         </div>
       }
       </div>
        </div>
    // </div>
  );
}
