import {React,useState} from 'react'
import { io } from 'socket.io-client';
import "./App.css";   
import socket from "./socket";
import { useNavigate } from 'react-router-dom';
export default function Register() {
    const navigate=useNavigate()
    const [user, setUser] = useState({
      Name:"",
      UserName:"",
      Email_Phone:""
    });
    const [currentUser, setCurrentUser] = useState("");
    function userData(event){
      event.preventDefault()
      const {name,value}=event.target
      setUser({
        ...user,
        [name]:value
      })
    }    
    function createUser(){
      navigate('/chat',{state:user})
    }
// async function saveUserName() {
//     socket.auth = { userName: user.UserName };
//     socket.connect();
//     socket.on("connect",()=>{
//       socket.emit("rooms",user);
//     })
//     if(user.Name && user.Email_Phone && user.UserName){
//       navigate('/chats',{state:user})
//     }
//   }
//   socket.on("connect_error", (err) => {
//     if (err.message) {
//       console.log("error", err.message);
//     }
//   });
//  function SelectedUser(data) {
//     setCurrentUser(data);
//     if(data){
//    socket.emit("rooms", data);
//     }
//   } 
  return (
    <div className=" userName top-0 w-full  h-[100%] flex items-center justify-center">
    <div className="fixed top-14 w-[14rem] bg-slate-100">
      <form className="flex my-6 flex-col gap-2 justify-center mx-2">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold text-black">Register</h1>
        </div>
        <div>
        <label htmlFor='Name' autoFocus className="text-green-600 font-semibold">
            Name:
          </label>
          <input
          name='Name'
           onChange={userData}
            type="text"
            autoFocus
            className="userName required w-full text-black"
            required
            placeholder="Enter Your Name..."
          />
          <label htmlFor='UserName' className="text-green-600 font-semibold">
            UserName:
          </label>
          <input
          name='UserName'
            type="text"
            onChange={userData}
            className="userName required w-full text-black"
            required
            placeholder="Enter Your userName..."
          />
             <label htmlFor='Email_Phone' className="text-green-600 font-semibold">
            Email:
          </label>
          <input
          name='Email_Phone'
           onChange={userData}
            type="text"
            className="userName required w-full text-black"
            required
            placeholder="Enter Your Email or Phone..."
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={(event)=>{
              event.preventDefault()
              navigate('/chats',{state:user})
            }}
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
