import { React, useState, useEffect, useRef } from "react";
import "./App.css";
import {useDispatch} from 'react-redux'
import {IoCameraOutline} from 'react-icons/io5'
import timer from './helper/Timer'
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css'
import {FiSend} from 'react-icons/fi'
import {BsSendSlashFill} from 'react-icons/bs'
import { deleteChats, getAllConversation, textMessage } from "./reducers/conversationReducer";
import {IoMdArrowRoundBack} from 'react-icons/io'
import MediaComponent from "./components/MediaComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import socket from "./socket";
import ChatMessageMedia from "./components/ChatMessageMedia";
import moment from 'moment-timezone'
import ChatsCard from "./components/ChatsCard";
export default function Chat(){
  const{sender,reciever}=useParams()  
  const navigate=useNavigate()
  const {state}=useLocation()
  const currentUser=state  
  let Ref = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [list, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [file,setFile]=useState()
  const[online,setOnline]=useState(false)
  const[uploading,setUploading]=useState(false)
  const[fileBlobUrl,setFileBlobUrl]=useState()
  const dispatch=useDispatch()
  const[msg_id,setMsg_id]=useState({
    conversation_id:"",
    count:0,
    textMsgData:[],
    fileMsgData:[]
  })
  window.addEventListener("online",()=>setOnline(true))
  async function sendChat(event) {
    event.preventDefault();
    try{
      const time=moment(new Date()).tz('/America/New_York').format('hh:mm:A')
    if(file){
      setMessageList((list) => [...list, {
        reciever_id:currentUser?currentUser.UserName:socket.id,
        sender_id:sender,
        msg_type:"file",
        time,
        url_type:(file.type==="image/jpeg" || file.type==="image/png" || file.type==="image/jpg")?"jpg":"mp4",
        secure_url:fileBlobUrl,
        type:"outgoing",
    }]); 
      const formData=new FormData()
      formData.append("file",file)
     setUploading(true)  
inputResetHandler()
setFile("")
      axios.post(`http://localhost:5002/api/conversation/chat/socialCom/${currentUser.UserName}/${sender}`,formData)
     .then((response)=>{   
      const data = {
               reciever_id:currentUser?currentUser.UserName:socket.id,
               sender_id:sender,
               msg_type:"file",
               time,
               url_type:response.data.message.format,
               secure_url:response.data.message.secure_url,
               type:"outgoing",
      }
       socket.emit("private_msg",data);
     setUploading(false)
     })
     .catch(err=>{
        if(err.response.data.success===false){
          localStorage.setItem("reSendingFile",file)
        }
     })
    }else{
    const data = {
      message: message,
      time,
       msg_type:"text",
      type:"outgoing",
      sender_id:sender,
      reciever_id: currentUser?currentUser.UserName:socket.id
    };
    await socket.emit("private_msg",data); 
    setMessageList((list) => [...list, {
      message: message,
      msg_type:"text",
      type:"outgoing",
      time,
      sender_id:sender,
      reciever_id:currentUser?currentUser.UserName:socket.id
    }]);
    setMessage("");
    await dispatch(textMessage(data))
  }
}catch(err){
  return "message not sent"
}
  }  
  const inputReset=useRef(null)
function changeHandler(event){
event.preventDefault()
setMessage(event.target.value)
}
function fileChangeHandler(event){
   event.preventDefault()
   let img=event.target.files[0] 
   setFile(img) 
   if(img){
   setFileBlobUrl(URL.createObjectURL(img))  
   }   
}
function inputResetHandler(){
  if(inputReset.current){
    inputReset.current.value="";
    inputReset.current.type="text";
    inputReset.current.type="file"
  }
}
  useEffect(() => {    
     Ref.current.scrollTop=Ref.current.scrollHeight
  }, [message,list])
  useEffect(() => { 
    socket.emit("room",currentUser.UserName) 
      socket.on("private_msg",(data) => {
      setMessageList((list) => [...list, data.data]);
    },[socket]);
    socket.on("typingStatus",(data)=>{
      setIsTyping(data)
    })
    // socket.on("online",(data)=>{
           
    // })
  },[socket])
  async function call(){
    const res=await dispatch(getAllConversation({reciever_id:reciever,sender_id:sender}))
    if(res.payload && res.payload.data.message[0]){
      setMsg_id((prev)=>({
        ...prev,
        conversation_id:res.payload.data.message[0]._id
      }))
     setMessageList((list) => [...list,...res.payload.data.message[0].chats]);
  }
}
  useEffect(()=>{
   call()
  },[])
  function postDeleteOpenHandler(data){  
   if(data.msg_type==="text"){
    setMsg_id((prev)=>({
        ...prev,
        count:prev.count+1,
        textMsgData:[...prev.textMsgData,data._id]         
    } ))
  }
  if(data.msg_type==="file"){
    setMsg_id((prev)=>({
        ...prev,
        count:prev.count+1,
        fileMsgData:[...prev.fileMsgData,{
        chat_id:data._id,
        msg_type:data.msg_type,
        public_id:data.public_id
      }]    
  } ))
    // setMsg_id({
    //   count:msg_id.count+1,
    //   fileMsgData:(prev)=>[...prev,data]
    // })
  }
    document.getElementById("deleteSlide").style.width='300px'
  }
  function postDeletecloseHandler(){
    if(document.getElementById("deleteSlide").clientHeight>0){
      // setMsg_id({
      //   count:0,
      //   textMsgData:[],
      //   fileMsgData:[]
      // })
    document.getElementById("deleteSlide").style.width='0px'
    }
  }
  async function msgDeleteHandler() {
    await dispatch(deleteChats(msg_id))
    postDeletecloseHandler()
    // setMsg_id({
    // conversation_id:"",
    // count:0,
    // textMsgData:[],
    // fileMsgData:[]
    // })
  //  postDeleteOpenHandler()
  }    
  return (
    <div className="w-full h-[100vh] pt-[3.5rem] bg-[#000000]  text-white">
       <div className="fixed w-full max-h-16 py-2 bg-[#363333] top-0">
        <div className="flex flex-row gap-2 px-2">
          <IoMdArrowRoundBack onClick={()=>navigate(-1)} className="text-xl"/>
          <div className="flex gap-3">
            <img src={currentUser.avatar} alt="img" className="w-10 h-10 border-2 cursor-pointer rounded-full border-solid" />
            <div className="flex flex-col gap-0 p-0">
              <h1 key={currentUser.UserName} className="user text-base font-medium text-white">{currentUser.UserName}</h1>
              {online?
               <h1 className="text-xs">Online</h1>:
              <h1 className="text-xs">{isTyping ? "typing..." : ""}</h1>            
              }
            </div>
          </div>
        </div>
      </div>
       <div  ref={Ref} onClick={postDeletecloseHandler} className="msg_container space-y-3 py-2 pb-[9.5rem] w-[100%] h-[100vh] overflow-scroll">
        {(list.length>0)? list.map((data, index)=>{
          // const timeFormate=moment(data.createdAt).tz('/America/New_York').format('hh:mm:A')
          return(
            <ChatsCard data={data} sender={sender} postDeleteOpenHandler={postDeleteOpenHandler} index={index} key={index}/>
          //   <div onAuxClick={()=>postDeleteOpenHandler(data.message)} className={(data.sender_id===sender)?"outgoing":"incoming"} key={index}>                
          //   <div className={(data.sender_id===sender)?"outgoingInner":"incomingInner"}>
          //       {(data.msg_type==="text")?
          //       <div className="pr-2 pb-3 min-w-24 pl-3">{data.message}</div>:
          //       <MediaComponent key={index} data={data}/>
          //         }
          //       <h6 className="absolute bottom-0 right-2 text-[#cdcaca] flex items-end text-xs">
          //        {timeFormate}
          //       </h6>               
          //   </div>
          // </div>
          );
        }):""}
      </div> 
        {/* delet slide */}
        <div id="deleteSlide" className="fixed w-0 top-1/4 flex justify-center items-center">
               <div className="w-[16rem] flex bg-slate-800 rounded-3xl flex-col gap-6 p-[1rem]">
                <h1 className="text-slate-300">Delete message?</h1>
                <div className="pl-6 flex justify-between">
                  <button onClick={postDeletecloseHandler} className="text-green-600 font-semibold">cancel</button>
                  <button onClick={msgDeleteHandler} className="text-green-600 font-semibold">delete for me</button>
                </div>
            </div>

       </div>
       {/* chat send form */}
      <form
      // w-[81%]
        className="bg-black fixed w-full bottom-0 right-0"
        onSubmit={sendChat}
        id="form"
      >
        <div className="relative flex gap-4 px-2">
          <label htmlFor="msg" className="w-full h-full rounded-md border-2 border-black">
          <input
            id="input"
            type="text"
            name="msg"
            onChange={changeHandler}
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
            value={message}
            autoFocus
            className=" w-full p-1 pr-12 text-black font-semibold"
            placeholder="Messagee"
          />
          </label>
          <div>
            <label htmlFor="file">
            <IoCameraOutline className="absolute right-20 w-7 h-7 text-black"/>
            </label>
           <input id="file" accept='image/*,video/*' type="file" ref={inputReset} name="file" onChange={fileChangeHandler}  className="file hidden text-black"/>
          <div className="h-10 w-10 flex justify-center items-center rounded-full bg-[#2eff35] text to-black">
          {(message.length>0 || file)?
          <button type="submit"><FiSend className="h-6 w-6 text-black font-semibold"/></button>
            :<BsSendSlashFill className=" h-6 w-6 text-black font-bold cursor-not-allowed"/>
           }
          </div>
          </div>
        </div>
      </form>
        {/*media popup */}
      {file?
        <ChatMessageMedia file={{
          url:fileBlobUrl,
          file_type:file.type
        }} inputResetHandler={setFile} sendChat={sendChat}/>:""
        }
    </div>
  );
}

