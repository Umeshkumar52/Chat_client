import React, { useEffect, useState } from 'react'
import socket from '../socket'
import {useDispatch} from 'react-redux'
export default function Notification() {
  const[notifictaion,setNotification]=useState([])
  const dispatch=useDispatch()

  useEffect(()=>{
    socket.on('notification',(data)=>{
      setNotification(Element=>[...Element,...data])
      console.log(data);
    },[socket])
  })
  return (
    <div>
      <div>
        <h1 className='font-bold text-xl'>Notification {notifictaion.length}</h1>
      </div>
      <div className='w-full h-[90vh] text-lg font-semibold flex justify-center items-center'>No notification</div>
    </div>
  )
}
