import {React,useState} from 'react'
import { io } from 'socket.io-client';
import "./App.css";   
import socket from "./socket";
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const navigate=useNavigate()
    const [user, setUser] = useState("");
    const [currentUser, setCurrentUser] = useState("");
async function saveUserName() {
    socket.auth = { userName: user };
    socket.connect();
    socket.on("connect",()=>{
      socket.emit("rooms",user);
      console.log("user is connected",user);
    })
    navigate('/chats')
  }
  socket.on("connect_error", (err) => {
    if (err.message) {
      console.log("error", err.message);
    }
  });
 function SelectedUser(data) {
    setCurrentUser(data);
   socket.emit("rooms", data);
  } 
  return (
    <div className=" userName top-0 w-full  h-[100%] flex items-center justify-center">
    <div className="fixed top-14 w-[14rem] bg-slate-100">
      <form className="flex my-6 flex-col gap-2 justify-center mx-2">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold text-black">Register</h1>
        </div>
        <div>
        <label autoFocus className="text-green-600 font-semibold">
            Name:
          </label>
          <input
           onChange={(event) => {
            event.preventDefault();
            setUser(event.target.value);

          }}
            type="text"
            autoFocus
            onChange={(event) => {
              event.preventDefault();
              setUser(event.target.value);

            }}
            className="userName required w-full text-black"
            required
            placeholder="Enter Your Name..."
          />
          <label className="text-green-600 font-semibold">
            UserName:
          </label>
          <input
            type="text"
            onChange={(event) => {
              event.preventDefault();
              setUser(event.target.value);

            }}
            className="userName required w-full text-black"
            required
            placeholder="Enter Your userName..."
          />
             <label className="text-green-600 font-semibold">
            Email:
          </label>
          <input
           onChange={(event) => {
            event.preventDefault();
            setUser(event.target.value);

          }}
            type="text"
            className="userName required w-full text-black"
            required
            placeholder="Enter Your Email or Phone..."
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={saveUserName}
            className="w-full bg-[#06048e] px-10 text-white font-semibold"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}
