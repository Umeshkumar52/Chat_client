import React, { useState, useEffect } from "react";
import socket from "./socket";
import "./App.css";
import UserList from "./UserList";
import Chat from "./Chat";
import { io } from "socket.io-client";
export default function ChatApp({ state }) {
  const [onlineUsers, setOnlineUsers] = useState();
  const [currentUser, setCurrentUser] = useState("");
 function SelectedUser(data) {
    setCurrentUser(data);
   socket.emit("rooms", data);
  }    
  useEffect(() => {
      socket.on("users", (users) => {
        console.log(users);
      setOnlineUsers({ ...onlineUsers,users});
    });
  }, [socket]);  
  return (
    <div>
        <div className="mainPanel relative overflow-y-scroll w-full flex">
          <div
            id="userPanel"
            className="overflow-y-scroll w-[30%] h-screen gap-4 bg-slate-200 text-black"
          >
            {onlineUsers
              ? onlineUsers.users.map((Element) => {
                  return (
                    <div
                      key={Element.userId}
                      onClick={() => {            
                        SelectedUser(Element.userName);
                       
                      }}
                      className="selectedUser  relative w-full hover:bg-slate-300 cursor-pointer pl-6"
                    >
                      <h1 className="font-semibold hover:text-yellow-600">
                        {Element.userName}
                      </h1>
                      <div>
                        <div className=" w-2 h-2 left-4 absolute animate-pulse rounded-full bg-green-500"></div>
                        <h2 className="relative text-xs text-[#ff4848]">
                          Online
                        </h2>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
         {currentUser?
         <Chat key={socket.id} socket={socket} currentUser={currentUser} />
         :<div className="flex flex-col px-10 w-full justify-center items-center">
            <h1 className="text-[#2d2e2e] text-2xl font-mono">Chat App for Window</h1>
            <h2 className="text-[#a2a5a2]">Send and recieve message without keeping onlien your phone.
               Use chat app upto 4 linked devices and one phone at the same time.
            </h2>
            
         </div>
       }
        </div>
    </div>
  );
}
