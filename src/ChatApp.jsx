import React, { useState, useEffect } from "react";
import "./App.css";
import SearchUserList from "./pages/SearchUserList";
import SearchBar from "./pages/SearchBar";
import { useSelector } from "react-redux";
import MessagerUSerList from "./components/MessagerUSerList";
import { useNavigate } from "react-router-dom";
import socket from "./socket";
export default function ChatApp() {    
  const state=useSelector((state)=>{return state.auth.user})
  const navigate=useNavigate()
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [searchUser,setSearchUser]=useState("")
   const[messagerUser,setMessagerUser]=useState([])
   let userList=JSON.parse(localStorage.getItem("messager_user"))
 let searchUserHandler=async(data)=>{
    setSearchUser(data)
}
 function SelectedUser(data){
    if(data){
    navigate(`/direct/${state.UserName}/inbox/${data.UserName}`,{state:data})
   socket.emit("rooms",data.UserName)
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
      if(userList){   
      setMessagerUser((existUser)=>[...existUser,...userList])
      }
    if(state.Contact.length>0){
      setOnlineUsers((users)=>[...users,...state.Contact])
    }
    // socket.emit("rooms",state.UserName);
    // socket.emit("online",state.UserName)
  },[])
  return (
        <div className="w-full mainPanel flex flex-col md:flex-row overflow-y-scroll  bg-black text-black">
        <div className="w-full lg:w-[20%] flex pt-2 px-2 border-2 border-cyan-800 h-screen ">
          <div className="w-full space-y-3">
          <div className="flex flex-col gap-4">
           <SearchBar updateSearchTerm={searchUserHandler} />
           <div className="flex gap-2 text-white flex-col">
            <h1 className="text-lg font-bold">{state.UserName}</h1>
            <img className="w-14 h-14 rounded-full" alt="img" src={state.avatar}/>
            <h2 className="text-white text-sm font-bold">Messages</h2>
           </div>
          </div>
          {/* userList */}
         {(searchUser.length>0)?
         
         <SearchUserList key={searchUser} type="toMessage" data={searchUser}/>
         
         :
         <div
            id="userPanel"
            className="overflow-y-scroll h-screen text-black"
          >
            {onlineUsers?
              messagerUser.map((Element,index) => {
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
