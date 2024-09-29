import React, { useState } from 'react'
import { FcLike } from "react-icons/fc";
import {useLocation} from "react-router-dom";
import {FiSend} from 'react-icons/fi'
export default function UserStories() {
  const[Reply,setReply]=useState()
 const{state}=useLocation()  
  return (
    <div className='relative w-full h-screen'>
     <video src={state.secure_url} preload='true' autoPlay className='w-full h-screen '></video>
     <div className='flex gap-4 items-center absolute top-4 left-4'>
     <img className=' w-12 h-12 rounded-full border-2' src={state.author.avatar}/>
     <h2 className='text-white font-mono italic text-2xl'>{state.author.UserName}</h2>
     </div>
     <div className='w-full px-2 absolute flex items-center bottom-1 justify-between'>
     <form className='flex gap-3 items-center' action="">
     <input onChange={(event)=>setReply(event.target.value)} placeholder='Reply...' type='text' className='p-2 border-2 border-slate-700 focus:ring-2 focus:ring-[#372cff] bg-slate-800 text-white font-medium text-lg rounded-2xl'/>
     {Reply?
     <div className='bg-slate-800 text-white p-1 flex justify-center items-center w-fit h-fit rounded-full'>  
      <FiSend className='text-3xl'/>
      </div>:""      
     }
     </form>     
     </div>
    </div>
  )
}
