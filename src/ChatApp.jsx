import React, { useState, useEffect } from "react";
import socket from "./socket";
import "./App.css";
import Chat from "./Chat";
import SearchUserList from "./pages/SearchUserList";
import SearchBar from "./pages/SearchBar";
import { useSelector } from "react-redux";
import MessagerUSerList from "./components/MessagerUSerList";
import { useNavigate } from "react-router-dom";
export default function ChatApp() {    
  const state=useSelector((state)=>{return state.auth.user})
  const navigate=useNavigate()
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [searchUser,setSearchUser]=useState("")
 let searchUserHandler=async(data)=>{
    setSearchUser(data)
}
 function SelectedUser(data){
    setCurrentUser(data);
    navigate('/chat/inbox',{state:{currentUser:data,user:state}})
    if(data){
   socket.emit("rooms",data)
    }
  }   
  window.onbeforeunload=()=>{
    socket.emit("offline",(data)=>{
    })
  }
  useEffect(() => {
      socket.on("users", (users) => {
      setOnlineUsers({ ...onlineUsers,users});
    });
  }, [socket]);  
  useEffect(()=>{
    if(state.Contact.length>0){
      setOnlineUsers((users)=>[...users,...state.Contact])
    }
    socket.emit("rooms",state.UserName);
  },[])     
  return (
        <div className="w-full mainPanel flex flex-col lg:flex-row overflow-y-scroll">
        <div className="w-full lg:w-[20%] flex pt-2 border-2 border-cyan-800 h-screen  bg-black text-black">
          {/* <div className="w-10 text-white flex justify-center">
           <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
           </ul>
          </div> */}
          <div className="w-full">
          <div className="flex flex-col gap-4">
           <SearchBar updateSearchTerm={searchUserHandler} />
           <div className="flex text-white flex-col">
            <h1 className="text-lg font-bold">{state.UserName}</h1>
            <img src="#"/>
            <h2 className="text-white text-sm font-bold">Messages</h2>
           </div>
          </div>
          {/* userList */}
         {(searchUser.length>0)?
         <SearchUserList key={searchUser} data={searchUser}/>:
         <div
            id="userPanel"
            className="overflow-y-scroll h-screen space-y-4 text-black"
          >
            {onlineUsers?
            //  onlineUsers.users.map((Element,index) => {
              onlineUsers.map((Element,index) => {
                  return (
                    <MessagerUSerList key={index} SelectedUser={SelectedUser} Element={Element}/>
                  );
                })
              : ""}
          </div>
         } 
          </div>
       </div>

          {/* <div className="lg:w-[80%]  ">
         {currentUser?
         <Chat key={currentUser} socket={socket} user={state} currentUser={currentUser} />
          :<div className="lg:w-full flex flex-col px-10 h-screen w-full justify-center items-center">
            <h1 className="text-[#2d2e2e] text-2xl font-mono">Chat App for Window</h1>
            <h2 className="text-[#a2a5a2]">Send and recieve message without keeping onlien your phone.
               Use chat app upto 4 linked devices and one phone at the same time.
            </h2>
            
         </div>
       }
       </div> */}
        </div>
  );
}
