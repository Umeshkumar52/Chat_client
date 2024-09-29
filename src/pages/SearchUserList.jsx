import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserByUserName } from '../reducers/authReducer';
import { useNavigate } from 'react-router-dom';
export default function SearchUserList({data}) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[userData,setUserData]=useState([])
  async function user(){
    const response=await dispatch(getUserByUserName(data))
    if(response.payload.data){
     setUserData((user)=>[...user,...response.payload.data.message])
    }
  }  
  useEffect(()=>{
    user()
  },[]) 
  console.log(userData);
  
  return (
    <div  className='userList h-screen flex-nowrap space-y-2  w-full overflow-scroll '>
      {
        userData.map((user)=>{
          return <div key={user._id} onClick={()=>navigate('/profile',{state:user._id})} className='w-full h-fit flex gap-2 hover:bg-[#dedcdc] text-white px-2 cursor-pointer'>
              <img src={user.avatar} className='w-10 h-10 rounded-full'/>
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
