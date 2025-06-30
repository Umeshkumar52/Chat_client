import { useState, useEffect, useRef, memo, useCallback } from "react";
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
import { useLocation } from "react-router-dom";
import socket from "./socket";
import ChatMessageMedia from "./components/ChatMessageMedia";
import { RiDeleteBin6Line } from "react-icons/ri";
import ChatsCard from "./components/ChatsCard";
import { FaVideo } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import VideoCall from "./components/VideoCall";
import AudioCall from "./components/AudioCall";
import { setStartCall } from "./reducers/audioCallReducer";
import UseDelay from "./helper/UseDelay";
import addFile from "./idb/addFile";
import removeFile from "./idb/removeFile";
import addToLocalStorage from "./idb/addToLocalStorage";
import removeFromLocalStorage from "./idb/removeFromLocalStorage";
import getChunks from "./helper/getChunks";
function Chat({ recieverUser }) {
  const url = window.location.pathname.split("/");
  const { state } = useLocation();
  const { isCallActive, type } = useSelector((state) => state.globalyCall);
  const { UserName, avatar } = useSelector((state) => {
    return state?.auth?.user;
  });
  const currentUser = recieverUser ? recieverUser : state || "";
  let Ref = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [list, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileBlobUrl, setFileBlobUrl] = useState();
  const [fileProgress, setFileProgress] = useState();
  const [selctingMode, setSelectingMode] = useState(false);
  const [deleteTab, setDeleteTab] = useState(false);
  const dispatch = useDispatch();
  const [msg_id, setMsg_id] = useState({
    conversation_id: "",
    textMsgData: [],
    fileMsgData: [],
  });
  const { onlineUser } = useSelector((state) => state.globalyCall);
  async function sendChat(event) {
    event.preventDefault();
    try {
      const time = timer();
      if (file) {
        //  const id=`${file.name}-${file.size}`
        setMessageList((list) => [
          ...list,
          {
            reciever_id: currentUser ? currentUser.UserName : socket.id,
            sender_id: UserName,
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
        // const chunks=getChunks(file)
         const formData = new FormData();
        // for(let i=0;i<chunks.length;i++){
        //   formData.append('chunk',chunks[i].Blob)
        //    formData.append('fileName',file.name)
        //     formData.append('chunkIndex',chunks[i].index)
        //      formData.append('totalChunks',chunks.length)
        // }
        formData.append("file", file);
        setUploading(true);
        inputResetHandler();
        // addFile(file)
        // addToLocalStorage("resumeFilesId",id)
        setFile("");
        axios
          .post(
            `http://localhost:5002/api/conversation/chat/socialCom/${currentUser.UserName}/${UserName}`,
            formData,
            // {
            //   onUploadProgress: (event) => {
            //     setUploading(true);
            //     let PercentComplete = Math.round(
            //       (event.loaded * 100) / event.total
            //     );
            //     setFileProgress(PercentComplete);
            //   },
            // }
          )
          .then((response) => {
            // const filename=`${response?.data.message?.original_filename}.${response?.data.message?.format}`
            // removeFile(`${filename}-${response?.data.message.bytes}`)
            // removeFromLocalStorage("resumeFilesId",`${filename}-${response?.data.message.bytes}`)
            const data = {
              reciever_id: currentUser ? currentUser.UserName : socket.id,
              sender_id: UserName,
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
            // when message failde to send store locally to retry
            if (err.response?.data.success === false) {
              // localStorage.setItem("reSendingFile", file);
            }
          });
      } else {
        const data = {
          message: message,
          time,
          msg_type: "text",
          type: "outgoing",
          sender_id: UserName,
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
            sender_id: UserName,
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
  async function callMessageHandaller(call) {
    const time = timer();
    const data = {
      message: call.message,
      callDuration: call.callDuration,
      time,
      msg_type: call.msg_type,
      type: "outgoing",
      sender_id: UserName,
      reciever_id: currentUser ? currentUser.UserName : socket.id,
    };
    await socket.emit("private_msg", data);
    setMessageList((list) => [
      ...list,
      {
        message: call.message,
        msg_type: call.msg_type,
        type: "outgoing",
        time,
        sender_id: UserName,
        reciever_id: currentUser ? currentUser.UserName : socket.id,
      },
    ]);
    setMessage("");
    await dispatch(textMessage(data));
  }
  const inputReset = useRef(null);
  const debounceCallback = UseDelay(() => {
    socket.emit("typing", {
      state: false,
      to: currentUser.UserName,
    });
  }, 2000);
  function changeHandler(event) {
    event.preventDefault();
    setMessage(event.target.value);
    if (!isTyping) {
      socket.emit("typing", {
        state: true,
        to: currentUser.UserName,
      });
    }
    debounceCallback();
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
    socket.on("private_msg", (data) => {
      setMessageList((list) => [...list, data.data]);
    });
    socket.on("typing", (state) => {
      setIsTyping(state);
    });
  }, [socket]);
  async function call() {
    const res = await dispatch(
      getAllConversation({
        reciever_id: currentUser.UserName,
        sender_id: UserName,
      })
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
  async function messageDeleteHandler() {
    setDeleteTab(false);
    setMessageList((prev) =>
      prev.filter(
        (Element) =>
          !msg_id?.textMsgData?.some((items) => items._id == Element._id)
      )
    );
    setMsg_id((prev) => ({
      ...prev,
      textMsgData: [],
      fileMsgData: [],
    }));
    setSelectingMode(false);
    const response = await dispatch(deleteChats(msg_id));
  }
  const handleLongPress = useCallback((data) => {
    if (data.msg_type === "file") {
      setMsg_id((prev) => ({
        ...prev,
        fileMsgData: prev?.fileMsgData?.some((items) => items._id == data._id)
          ? prev.fileMsgData?.filter((items) => items._id !== data._id)
          : [...prev?.fileMsgData, data],
      }));
    } else {
      setMsg_id((prev) => ({
        ...prev,
        textMsgData: prev?.textMsgData?.some((items) => items._id === data._id)
          ? prev.textMsgData?.filter((items) => items._id !== data._id)
          : [...prev?.textMsgData, data],
      }));
    }

    if (!selctingMode) {
      setSelectingMode(true);
    }
  });
  return (
    <div className="relative w-full h-[100vh] bg-[#000000] overflow-hidden text-white">
      <div className="w-full max-h-[12vh] bg-[#363333] px-4 py-2">
        {!selctingMode ? (
          <div className="flex justify-between items-center px-2">
            <div className="flex items-stretch gap-3">
              <img
                src={currentUser?.avatar}
                alt="img"
                className="size-12 border-2 cursor-pointer rounded-full border-solid"
              />
              <div className="flex flex-col">
                <h1
                  key={currentUser?.UserName}
                  className="user text-lg  lg:text-2xl font-medium text-white"
                >
                  {`${currentUser?.UserName?.slice(0, 10)}...`}
                </h1>

                {onlineUser.includes(currentUser.UserName) && (
                  <h1 className="text-sm font-semibold italic text-slate-400">
                    {isTyping ? "typing..." : "Online"}
                  </h1>
                )}
              </div>
            </div>

            <div className="text-2xl md:pr-6 md:gap-14 flex gap-6 items-center">
              <FaVideo
                onClick={() => {
                  dispatch(
                    setStartCall({
                      type: "video",
                      calleeUser: {
                        calleeId: currentUser?.UserName,
                        avatar: currentUser?.avatar,
                      },
                      callerUser: {
                        callerId: UserName,
                        avatar: avatar,
                      },
                    })
                  );
                }}
              />
              <IoIosCall
                onClick={() => {
                  dispatch(
                    setStartCall({
                      type: "voice",
                      calleeUser: {
                        calleeId: currentUser?.UserName,
                        avatar: currentUser?.avatar,
                      },
                      callerUser: {
                        callerId: UserName,
                        avatar: avatar,
                      },
                    })
                  );
                }}
              />
            </div>
          </div>
        ) : (
          <div className="w-full text-2xl h-full flex justify-between items-center px-2">
            <BiArrowBack
              onClick={() => {
                setMsg_id({
                  conversation_id: "",
                  count: 0,
                  textMsgData: [],
                  fileMsgData: [],
                });
                setSelectingMode(false);
                setDeleteTab(false);
              }}
            />
            <div className="flex gap-10">
              {/* <BsCopy onClick={copyMessages}/> */}
              <RiDeleteBin6Line onClick={() => setDeleteTab(true)} />
            </div>
          </div>
        )}
      </div>
      {/* chats list */}
      <div
        ref={Ref}
        className="msg_container h-[100vh] space-y-3 py-2 pb-[9rem] w-[100%] overflow-y-scroll"
      >
        {list.length > 0 &&
          list.map((data, index) => {
            return (
              <ChatsCard
                handleLongPress={handleLongPress}
                selectedId={[...msg_id?.textMsgData, ...msg_id?.fileMsgData]}
                data={data}
                sender={UserName}
                selctingMode={selctingMode}
                index={index}
                key={data._id + index}
              />
            );
          })}
      </div>
      {/* call notification */}

      {/* chat send form */}
      <form
        onSubmit={sendChat}
        id="form"
        className={`w-full fixed bg-black px-4 gap-3 bottom-0 flex items-center ${
          url[url.length - 1] == "direct" && "lg:w-[75vw] md:w-[65vw] "
        } `}
      >
        <div className="relative w-full ">
          <input
            id="input"
            type="text"
            name="msg"
            onChange={changeHandler}
            value={message}
            autoFocus
            placeholder=" Messages type here..."
            className={`text-lg rounded-xl pr-16 p-2 outline-none text-black w-full `}
          />
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
          <div className="size-12  flex justify-center items-center rounded-full bg-[#2eff35] text to-black">
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
      {/* calling handle */}
      {isCallActive && type == "video" && (
        <VideoCall callMessageHandaller={callMessageHandaller} />
      )}
      {isCallActive && type == "voice" && (
        <AudioCall callMessageHandaller={callMessageHandaller} />
      )}
      {/*delete tab popup */}
      {deleteTab && (
        <div className="w-[100%] h-[100%] flex justify-center items-center fixed left-0 top-0">
          <div className="bg-slate-900 w-full max-w-[20rem] flex flex-col gap-6 px-[1rem] pt-[1rem] pb-[2rem]  rounded-lg text-lg justify-center">
            <h1 className="text-slate-300">Delete messages?</h1>
            <div className="flex text-green-500 text-base font-semibold gap-10 justify-end">
              <button
                onClick={() => {
                  setMsg_id((prev) => ({
                    ...prev,
                    textMsgData: [],
                    fileMsgData: [],
                  }));
                  setSelectingMode(false);
                  setDeleteTab(false);
                }}
              >
                Cancel
              </button>
              <button onClick={messageDeleteHandler}>
                Delete for everyone
              </button>
            </div>
          </div>
        </div>
      )}
      {/* selected file pop-up */}
      {file && (
        <ChatMessageMedia
          file={{
            url: fileBlobUrl,
            file_type: file.type,
          }}
          inputResetHandler={setFile}
          sendChat={sendChat}
        />
      )}
    </div>
  );
}
export default memo(Chat);
