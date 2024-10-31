import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { specificNotificationupdate } from '../reducers/notificationReducer';
import {useNavigate} from 'react-router-dom'
export default function NotificationCard(items){
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[isRead,setIsRead]=useState(false)
  async function ReadNotificationHandler(){
     if(!items.isRead){
      const response=await dispatch(specificNotificationupdate({user_id:items.reciever,_id:items._id}))
      setIsRead(true)
     }
     if(items.type=="following"){
       navigate('/friendRequest',{state:items})
     }else if(items.type=="postReact"){
       navigate(`/post/${items.post_id}`)
     }else if(items.type=="reelReact"){
      navigate(`/reel/${items.reel_id}`)
     }
  }
  return(
    <div  onClick={ReadNotificationHandler} className={items.isRead ||isRead?"isRead":"notRead"}>
      <div className='w-[6rem]'>
      <img className='size-16 border-2 rounded-full' src={items.sender.avatar}/>:""
      </div>
      <div className='w-full'>
        <span className='text-lg font-semibold'>{items.sender.UserName}</span>{items.message}
        </div>
    </div>
  )}
