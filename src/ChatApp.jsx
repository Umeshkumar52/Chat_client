import React, { useState, useEffect } from "react";
import "./App.css";
import SearchUserList from "./pages/SearchUserList";
import SearchBar from "./pages/SearchBar";
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
//  let searchUserHandler=async(data)=>{
//     setSearchUser(data)
//   }
//  function SelectedUser(data){
//     setSelectedUser(data) 
//     // navigate(`${data.UserName}`,{state:data})
//     // socket.emit("rooms",data.UserName)
//   }   
  window.onbeforeunload=()=>{
    socket.emit("offline",(data)=>{
    })
  }
  useEffect(() => {
      socket.on("users", (users) => {
      setOnlineUsers({ ...onlineUsers,users});
    });
  }, [socket]);  
  // useEffect(()=>{   
  //     if(userList){   
  //     setMessagerUser((existUser)=>[...existUser,...userList])
  //     }
  //   if(state.Contact.length>0){
  //     setOnlineUsers((users)=>[...users,...state.Contact])
  //   }
  // },[])
  return (
        <div className="mainPanel w-full h-screen flex overflow-hidden bg-black text-black">
       {/* User Panel */}
        <div className="w-full h-screen md:w-[35%] lg:w-[25%] flex flex-col">
           <div className="flex gap-2 text-white flex-col">
            <div className="flex items-center gap-4">
            <img className="w-14 h-14 rounded-full" alt="img" src={state.avatar}/>
            <h1 className="text-lg font-bold">{state.UserName}</h1>
            </div>
            <h2 className="text-white text-sm font-bold">Messages</h2>
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
