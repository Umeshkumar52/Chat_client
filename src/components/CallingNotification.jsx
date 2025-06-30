import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import socket from '../socket'
import { BiVideo } from 'react-icons/bi'
import {setCallEnd,setAcceptCall} from '../reducers/audioCallReducer'
export default function CallingNotification({data}) {
  const dispatch=useDispatch()
  const{callerUser,type}=useSelector((state)=>state.globalyCall)
  const navigate=useNavigate()
  function AcceptCall(){
    dispatch(setAcceptCall()) 
  }
  function CancelCall(){
    socket.emit("end-call",callerUser?.UserName)
    dispatch(setCallEnd())
  }
  return (
    <div className='w-full fixed top-1 flex justify-center'>
    <div className='w-full flex flex-col gap-2 max-w-[22rem] rounded-xl mx-2 px-[1.5rem] py-[1rem] bg-slate-500'>
       <div className='w-full flex gap-4'>
       <img src={callerUser?.avatar} className='size-14 rounded-full border-2 border-solid'/>
       <div className='flex flex-col'>
           <h1 className='text-lg font-semibold text-slate-200'>{callerUser?.UserName||"Unknown"}</h1>
           <h5 className='text-sm flex items-center gap-2 text-slate-200'><span><BiVideo className='text-xl md:text-2xl'/></span>{type==="video"?"Video Call ":"Audio Call"}</h5>
       </div>
       </div>
        <div className='w-full flex justify-end gap-10'>
            <button onClick={CancelCall} className='bg-red-600 text-white text-lg font-semibold px-[1rem] rounded-lg py-1'>Cancel</button>
            <button onClick={AcceptCall} className='bg-green-600 text-white text-lg font-semibold px-[1rem] rounded-lg py-1'>Accept</button>
        </div>
       </div>
</div>
  )
}
