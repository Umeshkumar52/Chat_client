import { React, useState, useEffect, useRef } from "react";
import GroupDiscus from "./GroupDiscus";
import "./App.css";
import avatar from "./avatar.png";
export default function ChatPanel({ user, socket, currentUser }) {
  let Ref = useRef(null);
  const input = document.getElementById("input");
  const [isTyping, setIsTyping] = useState(false);
  const [joinGroup, setJoinGroup] = useState(false);
  const msg_container = document.querySelector(".msg_container");
  const form = document.getElementById("form");
  const [list, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [goinGroup, setGoin] = useState(false);
  let us=document.querySelector('.user')
  function typingHandler(data) {
    setIsTyping(data);
  }
  function appendmsg(data, type) {
    const list = document.createElement("div");
    let className = type;
    list.classList.add(className);    
    if(data.message){
    let markup = `
            <h4>${data.message}</h4>
            <h6>${data.time}</h6>
            `;
    list.innerHTML = markup;
    msg_container.appendChild(list);
    }
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
      userName: user,
      to: currentUser?currentUser:user,
    };
   await await socket.emit("private_msg",data);
    appendmsg(data, "outgoing");
    setMessage("");
  }
  useEffect(() => {    
     Ref.current.scrollTop=Ref.current.scrollHeight
     console.log(Ref.current.scrollHeight);
  }, [message,list]);
  useEffect(() => {
      socket.on("private_msg",(data) => {
        // appendmsg(data.data,"incoming")
      setMessageList((list) => [...list, data]);
    });
    socket.on("typingStatus",(data)=>{
      setIsTyping(data)
    })
  }, [socket]);
  return (
    <div ref={Ref} className="relative main_Container w-[70%] overflow-auto h-screen text-white">
   
      <div key={currentUser} className=" msg_container pl-[.5rem] pt-[3.5rem] p-4 gap-2 ">
        {list.map((msg, index) => {
          return (
            <div className="incMsgCover">
              <div className=" flex" ref={Ref} key={index}>
                <div className="incoming flex flex-col justify-end w-full py-0 px-1">
                  <h4 className="pb-1 pt-0 pr-[3.5rem]">{msg.data.message}</h4>
                  <h6 className="absolute bottom-0 right-2 top-2 text-[#e6e6e9] flex items-end text-xs">
                    {msg.data.time}
                  </h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <form
        className="fixed w-[70%] bottom-0 right-0"
        onSubmit={sendChat}
        id="form"
      >
        <div className="border-2 ">
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
          <button
            type="submit"
            id="button"
            className=" p-2 absolute w-16 right-0 bg-yellow-400 hover:bg-yellow-600 text-white font-semibold"
          >
            Send
          </button>
        </div>
      </form>
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
    
    </div>
  );
}
