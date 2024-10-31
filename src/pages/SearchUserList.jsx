import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {SearchUsers } from '../reducers/authReducer';
import { useNavigate } from 'react-router-dom';
export default function SearchUserList({data,type}) {
  const sender=useSelector((state)=>{return state.auth.user})
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[userData,setUserData]=useState([])
  async function user(){
    const response=await dispatch(SearchUsers(data))
    if(response.payload){
     setUserData((userData)=>[...userData,...response.payload.data.message])
    }
  }  
  useEffect(()=>{
    user()
  },[data]) 
  return (
    <div  className='userList h-screen flex-nowrap space-y-2 pb-4  w-full overflow-y-scroll '>
      {
        userData.map((user)=>{
          return <div key={user._id} onClick={()=>{
            type=="toMessage"?navigate(`/direct/${sender.UserName}/inbox/${user.UserName}`,{state:user}):
            navigate(`/${user.UserName}`)
            }} className='w-full h-fit flex gap-2 hover:bg-[#dedcdc] text-white px-2 cursor-pointer'>
              <img src={user.avatar} className='w-14 h-14 rounded-full'/>
              <div>
              <h1 className='text-lg font-semibold text-[#8808ff]'> {user.UserName}</h1>
              <h2 className='text-sm italic text-[#9da1a1]'>{user.Name}</h2>
              </div>
            </div>   
        })
      }
    </div>
  )
}
