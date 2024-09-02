import { React, useState, useEffect, useRef } from "react";
import GroupDiscus from "./GroupDiscus";
import "./App.css";
import avatar from "./avatar.png";
import MessageInput from "./MessageInput";
import axios from 'axios'
import {useDispatch} from 'react-redux'
export default function Chat({ user,socket,currentUser }) {
  let Ref = useRef(null);
  const input = document.getElementById("input");
  const [isTyping, setIsTyping] = useState(false);
  const [joinGroup, setJoinGroup] = useState(false);
  const msg_container = document.querySelector(".msg_container");
  const form = document.getElementById("form");
  const [list, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [goinGroup, setGoin] = useState(false);
  const [file,setFile]=useState()
  const [image,setImage]=useState()
  const dispatch=useDispatch()
  let us=document.querySelector('.user')
  // function appendmsg(data, type) {
  //   const list = document.createElement("div");
  //   let className = type;
  //   list.classList.add(className);    
  //   if(data.message){
  //   let markup = `
  //           <h4>${data.message}</h4>
  //           <h6>${data.time}</h6>
  //           `;
  //   list.innerHTML = markup;
  //   console.log(list);
    
  //   msg_container.appendChild(list);
  //   }
  // }
  function typingHandler(data) {
    setIsTyping(data);
  }
  async function sendChat(event) {
    event.preventDefault();
    const hours = new Date(Date.now()).getHours();
    let realHours;
    let newFormat;
    if (hours > 12) {
      realHours = hours - 12;
    } else if (hours < 12) {
      realHours = hours;
    } else if (hours == 12) {
      realHours = hours;
    }

    if (hours >= 12) {
      newFormat = "PM";
    } else {
      newFormat = "AM";
    }
    const data = {
      message: message,
      time:
        realHours + ":" + new Date(Date.now()).getMinutes() + " " + newFormat,
      from: user,
      to: currentUser?currentUser:user,
      type:"outgoing"
    };
    await socket.emit("private_msg",data); 
    setMessageList((list) => [...list, {
      message: message,
      time:
        realHours + ":" + new Date(Date.now()).getMinutes() + " " + newFormat,
      from: user,
      to: currentUser?currentUser:user,
      type:"outgoing"
    }]);
    setMessage("");
  }  
//  async function fetchMsg() {
//     const msg=await axios.get("http://localhost:5002/api/conversation/chat/66d0a4f2c3b389b6f0425399/66cdeb55add4468ac3eaa8c2")
//     console.log(msg);
//   }
// fetchMsg()
// function changeHandler(event){
// event.preventDefault()
// const {name,value}=event.target
// setMessage({
//   ...message,
//   [name]:value
// })
// }
function fileChangeHandler(event){
   event.preventDefault()
   setFile( event.target.files[0]) 
}
 function fileUploadHandler() {
  socket.emit("uploadFile",file)
  const data=axios.post(`http://localhost:5002/api/conversation/chat/${currentUser}`,)
}

  // useEffect(() => {    
  //    Ref.current.scrollTop=Ref.current.scrollHeight
  //    console.log(Ref.current.scrollHeight);
  // }, [message,list]);
  useEffect(async() => {  
     await socket.on("private_msg",(data) => {
      setMessageList((list) => [...list, data.data]);
    },[socket]);
    socket.on("uploadFileResponse",(data)=>{
      setImage(`base/${data}`)
    })
    socket.on("typingStatus",(data)=>{
      setIsTyping(data)
    })
  }, [socket]);   
  console.log(image);
   
  return (
    <div className="w-full pt-[3rem] text-white">
       <div className="fixed w-full h-10 bg-black top-0">
        <div className=" flex flex-row gap-2 items-center">
          <div className="flex gap-3">
            <img
              src={avatar}
              className="w-8 cursor-pointer h-8 rounded-full border-dotted border-1"
            />
            <div className="flex flex-col gap-0 p-0">
              <h1 key={currentUser} className="user text-base font-medium text-white">{currentUser}</h1>
              <h1 className="text-xs">{isTyping ? "typing..." : ""}</h1>
            </div>
            <a
              className="text-yellow-400 cursor-pointer fixed right-4 font-serif text-sm"
              onClick={() => {
                setGoin(true);
              }}
            >
              Goin Group
            </a>
          </div>
        </div>
      </div>
       <div  ref={Ref}  className="relative msg_container w-[100%] flex flex-col gap-10 h-[90vh] overflow-scroll ">
        {(list.length>0)? list.map((msg, index) => {
          return (
            <div className="w-full h-fit bg-teal-300">
              <div className={msg.type} key={index}>
                  <h4 className="pb-1 pt-0 pr-[3.5rem]">{msg.message}</h4>
                  <h6 className="absolute bottom-0 right-2 top-2 text-[#e6e6e9] flex items-end text-xs">
                    {msg.time}
                  </h6>               
              </div>
            </div>
          );
        }):""}
      </div> 

      {/* <MessageInput appendmsg={appendmsg} user={user} currentUser={currentUser} socket={socket} /> */}
      <form
        className="fixed w-[81%] bottom-0 right-0"
        onSubmit={file?fileUploadHandler:sendChat}
        id="form"
      >
        <div className="flex border-2 ">
          <input
            id="input"
            type="text"
            required
            onChange={(event) => {
              event.preventDefault();
              setMessage(event.target.value);
            }}
            onKeyDown={() =>{
               socket.emit("typingStatus",{
                status:true,
                to:currentUser
              })
            }}
            onKeyUp={()=>{
              setTimeout(()=>{
                socket.emit("typingStatus",{
                  status:false,
                  to:currentUser
                })
              },500)
            }}
            onm
            value={message}
            autoFocus
            name="input"
            className="w-full border-none p-1 text-black font-semibold"
            placeholder="Messagee"
          />
        
          <div className="flex">
          <input type="file" onChange={fileChangeHandler}  className="text-black"/>
          <button
            type="submit"
            id="button"
            className=" p-2 absolute w-16 right-0 bg-yellow-400 hover:bg-yellow-600 text-white font-semibold"
          >
            Send
          </button>
          </div>
        </div>
      </form>
      {/* <div className="fixed w-full h-10 bg-black top-0">
        <div className=" flex flex-row gap-2 items-center">
          <div className="flex gap-3">
            <img
              src={avatar}
              className="w-8 cursor-pointer h-8 rounded-full border-dotted border-1"
            />
            <div className="flex flex-col gap-0 p-0">
              <h1 key={currentUser} className="user text-base font-medium text-white">{currentUser}</h1>
              <h1 className="text-xs">{isTyping ? "typing..." : ""}</h1>
            </div>
            <a
              className="text-yellow-400 cursor-pointer fixed right-4 font-serif text-sm"
              onClick={() => {
                setGoin(true);
              }}
            >
              Goin Group
            </a>
          </div>
        </div>
      </div> */}
    
    </div>
  );
}
