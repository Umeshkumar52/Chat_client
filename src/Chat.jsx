import { React, useState, useEffect, useRef } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { IoCameraOutline } from "react-icons/io5";
import timer from "./helper/Timer";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { FiSend } from "react-icons/fi";
import { BsSendSlashFill } from "react-icons/bs";
import {
  deleteChats,
  getAllConversation,
  textMessage,
} from "./reducers/conversationReducer";
import { IoIosCall } from "react-icons/io";
import {useLocation, useNavigate, useParams } from "react-router-dom";
import socket from "./socket";
import ChatMessageMedia from "./components/ChatMessageMedia";
// import moment from "moment-timezone";
import ChatsCard from "./components/ChatsCard";
import { FaVideo } from "react-icons/fa";
export default function Chat({recieverUser}) {
  const url=window.location.pathname.split('/') 
  const { reciever } = useParams();
  const{state}=useLocation()
  const navigate = useNavigate();
  const sender=useSelector((state)=>{return state?.auth?.user?.UserName}) 
  const currentUser = recieverUser?recieverUser:state;
  let Ref = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [list, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const [online, setOnline] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileBlobUrl, setFileBlobUrl] = useState();
  const dispatch = useDispatch();
  const [msg_id, setMsg_id] = useState({
    conversation_id: "",
    count: 0,
    textMsgData: [],
    fileMsgData: [],
  });
  window.addEventListener("online", () => setOnline(true));
  async function sendChat(event) {
    event.preventDefault();
    try {
      // const time = moment(new Date()).tz("/America/New_York").format("hh:mm:A");
      const time=timer()
      if (file) {
        setMessageList((list) => [
          ...list,
          {
            reciever_id: currentUser ? currentUser.UserName : socket.id,
            sender_id: sender,
            msg_type: "file",
            time,
            url_type:
              file.type === "image/jpeg" ||
              file.type === "image/png" ||
              file.type === "image/jpg"
                ? "jpg"
                : "mp4",
            secure_url: fileBlobUrl,
            type: "outgoing",
          },
        ]);
        const formData = new FormData();
        formData.append("file", file);
        setUploading(true);
        inputResetHandler();
        setFile("");
        axios
          .post(
            `http://localhost:5002/api/conversation/chat/socialCom/${currentUser.UserName}/${sender}`,
            formData
          )
          .then((response) => {
            const data = {
              reciever_id: currentUser ? currentUser.UserName : socket.id,
              sender_id: sender,
              msg_type: "file",
              time,
              url_type: response.data.message.format,
              secure_url: response.data.message.secure_url,
              type: "outgoing",
            };
            socket.emit("private_msg", data);
            setUploading(false);
          })
          .catch((err) => {
            if (err.response.data.success === false) {
              localStorage.setItem("reSendingFile", file);
            }
          });
      } else {
        const data = {
          message: message,
          time,
          msg_type: "text",
          type: "outgoing",
          sender_id: sender,
          reciever_id: currentUser ? currentUser.UserName : socket.id,
        };
        await socket.emit("private_msg", data);
        setMessageList((list) => [
          ...list,
          {
            message: message,
            msg_type: "text",
            type: "outgoing",
            time,
            sender_id: sender,
            reciever_id: currentUser ? currentUser.UserName : socket.id,
          },
        ]);
        setMessage("");
        await dispatch(textMessage(data));
      }
    } catch (err) {
      return "message not sent";
    }
  }
  const inputReset = useRef(null);
  function changeHandler(event) {
    event.preventDefault();
    setMessage(event.target.value);
  }
  function fileChangeHandler(event) {
    event.preventDefault();
    let img = event.target.files[0];
    setFile(img);
    if (img) {
      setFileBlobUrl(URL.createObjectURL(img));
    }
  }
  function inputResetHandler() {
    if (inputReset.current) {
      inputReset.current.value = "";
      inputReset.current.type = "text";
      inputReset.current.type = "file";
    }
  }
  useEffect(() => {
    Ref.current.scrollTop = Ref.current.scrollHeight;
  }, [message, list]);
  useEffect(() => {
    socket.emit("room", currentUser.UserName);
    socket.on(
      "private_msg",
      (data) => {
        setMessageList((list) => [...list, data.data]);
      },
      [socket]
    );
    socket.on("typingStatus", (data) => {
      setIsTyping(data);
    });
  }, [socket]);
  async function call() {
    const res = await dispatch(
      getAllConversation({ reciever_id:currentUser.UserName, sender_id: sender })
    );
    if (res.payload && res.payload.data.message[0]) {
      setMsg_id((prev) => ({
        ...prev,
        conversation_id: res.payload.data.message[0]._id,
      }));
      setMessageList((list) => [...list, ...res.payload.data.message[0].chats]);
    }
  }
  useEffect(() => {
    call();
  }, [recieverUser]);
  function postDeleteOpenHandler(data) {
    if (data.msg_type === "text") {
      setMsg_id((prev) => ({
        ...prev,
        count: prev.count + 1,
        textMsgData: [...prev.textMsgData, data._id],
      }));
    }
    if (data.msg_type === "file") {
      setMsg_id((prev) => ({
        ...prev,
        count: prev.count + 1,
        fileMsgData: [
          ...prev.fileMsgData,
          {
            chat_id: data._id,
            msg_type: data.msg_type,
            public_id: data.public_id,
          },
        ],
      }));
      // setMsg_id({
      //   count:msg_id.count+1,
      //   fileMsgData:(prev)=>[...prev,data]
      // })
    }
    document.getElementById("deleteSlide").style.width = "300px";
  }
  function postDeletecloseHandler() {
    if (document.getElementById("deleteSlide").clientHeight > 0) {
      // setMsg_id({
      //   count:0,
      //   textMsgData:[],
      //   fileMsgData:[]
      // })
      document.getElementById("deleteSlide").style.display = "none";
      document.getElementById("deleteSlide").style.width = "0px";
    }
  }
  async function msgDeleteHandler() {
    await dispatch(deleteChats(msg_id));
    postDeletecloseHandler();
    // setMsg_id({
    // conversation_id:"",
    // count:0,
    // textMsgData:[],
    // fileMsgData:[]
    // })
    //  postDeleteOpenHandler()
  }  
  return (
    <div className="relative w-full h-[100vh] bg-[#000000] overflow-hidden text-white">
      <div className="w-full h-18 bg-[#363333] p-2">
        <div className="flex justify-between items-center px-2">
            <div className="flex gap-3">
              <img
                src={currentUser?.avatar}
                alt="img"
                className="size-14 border-2 cursor-pointer rounded-full border-solid"
              />
              <div className="flex flex-col">
                <h1
                  key={currentUser.UserName}
                  className="user text-lg  lg:text-2xl font-medium text-white"
                >
                  {currentUser.UserName}
                </h1>
             
                {online ? (
                  <h1 className="text-xs">Online</h1>
                ) : (
                  <h1 className="text-xs">{isTyping ? "typing..." : ""}</h1>
                )}
              </div>
            </div>
          {/* Calling */}
          <div className="text-2xl md:pr-6 md:gap-14 flex gap-6 items-center" >
            <FaVideo
              onClick={() =>
                navigate("/video", {
                  state: {
                    UserName: currentUser.UserName,
                    avatar: currentUser.avatar,
                  },
                })
              }
            />
            <IoIosCall
              onClick={() =>
                navigate("/audio", {
                  state: {
                    UserName: currentUser.UserName,
                    avatar: currentUser.avatar,
                  },
                })
              }
            />
          </div>
        </div>
      </div>
      <div
        ref={Ref}
        onClick={postDeletecloseHandler}
        className="msg_container h-[100vh] space-y-3 py-2 pb-[9rem] w-[100%] overflow-scroll"
      >
        {list.length>0&&
          list.map((data, index) => {
              return (
                <ChatsCard
                  data={data}
                  sender={sender}
                  postDeleteOpenHandler={postDeleteOpenHandler}
                  index={index}
                  key={index}
                />
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
            })
          }
      </div>
      {/* delet slide */}
      <div
        id="deleteSlide"
        className="fixed w-0 top-1/4 hidden justify-center items-center"
      >
        <div className="w-[16rem] flex bg-slate-800 rounded-3xl flex-col gap-6 p-[1rem]">
          <h1 className="text-slate-300">Delete message?</h1>
          <div className="pl-6 flex justify-between">
            <button
              onClick={postDeletecloseHandler}
              className="text-green-600 font-semibold"
            >
              cancel
            </button>
            <button
              onClick={msgDeleteHandler}
              className="text-green-600 font-semibold"
            >
              delete for me
            </button>
          </div>
        </div>
      </div>
      {/* chat send form */}
      <form onSubmit={sendChat} id="form" className={`w-full fixed bg-black gap-3 bottom-0 flex items-center ${url[url.length-1]=="direct"&&"lg:w-[75vw] md:w-[65vw] "} `}>
            <div className="relative w-full ">
            <input
              id="input"
              type="text"
              name="msg"
              onChange={changeHandler}
              onKeyDown={() => {
                socket.emit("typingStatus", {
                  status: true,
                  to: currentUser,
                });
              }}
              onKeyUp={() => {
                setTimeout(() => {
                  socket.emit("typingStatus", {
                    status: false,
                    to: currentUser,
                  });
                }, 500);
              }}
              value={message}
              autoFocus
              placeholder=" Messages type here..."
              className={`text-lg pr-16 p-4 text-black w-full `}/>
            <div className="absolute right-12 top-3 ">
            <label htmlFor="file">
              <IoCameraOutline className="absolute w-7 h-7 text-black" />
            </label>
            <input
              id="file"
              accept="image/*,video/*"
              type="file"
              ref={inputReset}
              name="file"
              onChange={fileChangeHandler}
              className="file hidden text-black"
            />
          </div>
            </div>
            <div className="right-2 flex items-center justify-center">
            <div className="h-14 w-14  flex justify-center items-center rounded-full bg-[#2eff35] text to-black">
              {message?.length > 0 || file ? (
                <button type="submit">
                  <FiSend className="h-6 w-6 text-black font-semibold" />
                </button>
              ) : (
                <BsSendSlashFill className=" h-6 w-6 text-black font-bold cursor-not-allowed" />
              )}
            </div>
            </div>
          
      </form>
      {/*media popup */}
      {file ? (
        <ChatMessageMedia
          file={{
            url: fileBlobUrl,
            file_type: file.type,
          }}
          inputResetHandler={setFile}
          sendChat={sendChat}
        />
      ) : (
        ""
      )}
    </div>
  );
}
