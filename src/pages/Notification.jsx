import React, { useEffect, useState } from 'react'
import socket from '../socket'
import {useDispatch, useSelector} from 'react-redux'
import {userNotification } from '../reducers/notificationReducer'
// import NotificationCard from '../components/NotificationCard'
export default function Notification(){
  const unReadNotification=useSelector((state)=>{return state.notification.unReadNotification})  
  const _id=useSelector((state)=>{return state.auth.user._id})  
  const[notifictaion,setNotification]=useState([])
  const dispatch=useDispatch()
  async function userNotificationHandler(){
    const response=await dispatch(userNotification(_id))
      // if(response.payload){
      //   setNotification((prev)=>[...prev,...response.payload.data.message])
      // }
  }
 useEffect(()=>{
 userNotificationHandler()
 },[])  
 console.log(notifictaion);
 
  // useEffect(()=>{
  //   socket.on('notification',(data)=>{
  //     setNotification(Element=>[...Element,...data])
  //     console.log(data);
  //   },[socket])
  // })  
  return (
    <div className='hiddenScrollBar h-screen space-y-4 overflow-y-scroll'>
      
      <div>
        <h1 className='font-bold text-xl'>Notification <span className='text-red-600'>{unReadNotification>0?notifictaion:""}</span></h1>
      </div>
          
    </div>
  )
}
