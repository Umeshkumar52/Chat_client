import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {userfollowing} from '../reducers/authReducer'
import UserFollowerCard from '../components/UserFollowerCard'
import UserFollowingCard from '../components/UserFollowingCard'
export default function FriendRequests() {
  const user_id=useSelector((state)=>{
    return state.auth.user._id
  })  
  const dispatch=useDispatch()
  const[followingData,setFollowing]=useState([])
  const[followerData,setFollower]=useState([]) 
  async function user_following(){
    const response=await dispatch(userfollowing(user_id))
    if(response.payload.data.message!=null){
      setFollower((friends)=>[...friends,...response.payload.data.message.Followers])
      setFollowing((friends)=>[...friends,...response.payload.data.message.Following])
    }
  }
  useEffect(()=>{
    user_following()
  },[])
  return (
    <div className='hiddenScrollBar w-full h-screen px-2 space-y-2 overflow-y-scroll'>
      <fieldset className='w-full space-y-6 py-2'>
      <input id='following' defaultChecked className='peer/following hidden' name='status' type="radio" />
      <label htmlFor="following" className='peer-checked/following:text-sky-500 text-lg font-semibold px-4'>Following <span>{followingData.length}</span></label>
      <input id='follow' className='peer/follow hidden' name='status' type="radio" />
      <label htmlFor="follow" className='peer-checked/follow:text-sky-500 text-lg font-semibold'>Followers <span>{followerData.length}</span></label>
     <div className='hidden peer-checked/following:block space-y-4'>
     {followingData.length>0?
       followingData.map((Element,index)=>{
            return <UserFollowingCard key={index} data={Element}/>
       }):
        <p>No Following</p>
     }
     </div>
     <div className='hidden peer-checked/follow:block space-y-4'>
     {followerData.length>0?
       followerData.map((Element,index)=>{
            return <UserFollowerCard key={index} data={Element}/>
       }):
      <p>No Followers</p>
     }
     </div>
     </fieldset>
    </div>
  )
}
