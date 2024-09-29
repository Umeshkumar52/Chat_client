import React, { useEffect, useState } from 'react'
import { following, unfollowing } from '../reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../socket';
export default function UserFollowerCard({data}) {
  const[isFollowing,setIsFollowing]=useState(false)
  const user_id=useSelector((state)=>{
    return state.auth.user._id
  })  
  const dispatch=useDispatch()
  async function followingHandler() {
    await dispatch(following({requester:user_id,reciever:data._id}))     
  }
  async function unfollowingHandler() {
    await dispatch(unfollowing({requester:user_id,reciever:data._id}))     
  }
  useEffect(()=>{
      data.Followers.map(Element=>{
        if(Element==user_id){
          setIsFollowing(true)
        }
      })
  },[])   
  useEffect(()=>{
    socket.on('following',(following)=>{
     if(data._id==following.reciever){
       setIsFollowing(true)
       }
    })
    socket.on('unfollowing',(following)=>{
      if(data._id==following.reciever){
        setIsFollowing(false)
      }
     })
  },[socket])         
  return (
    <div className='w-full flex items-center h-fit justify-between' >
    <div className='flex items-center gap-3'>
    <img className='h-10 w-10 rounded-full' src={data.avatar}/>
    <div className='flex flex-col gap-0'>
     <div className='flex gap-2'>
     <h2 className='text-lg font-semibold '>{data.UserName}</h2>
       {!isFollowing?
        <button onClick={followingHandler} className='text-[#5855ff] text-sm font-semibold' > Follow</button>:""}
     </div>
      <h2 className='text-sm font-medium text-slate-500 '>{data.Name}</h2>
      </div>
   </div>
   <button onClick={unfollowingHandler} className='px-3 rounded-lg py-1 bg-[#f0f0f0]'>Remove</button>
  </div>
  )
}
