import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Stories({data}) {
  const navigate=useNavigate()
  // const{onlineUser}=useSelector(state=>state.calling)
  return ( 
      <div onClick={()=>{navigate('/stories',{state:data})}} className='storyMain'>
      <div>
       <div className='relative w-[65px] h-[65px] rounded-full bg-gradient-to-r from-[#4643ff] to-[#cb0eff] p-[3px]'>
        <img src={data.user?.avatar} className='w-full h-full rounded-full bg-white'/>
{/*        {onlineUser?.includes(data.user.UserName)&&
         <svg className='absolute size-4 bg-green-400 rounded-full bottom-2 right-0'/>
       } */}
       </div>
  </div>
      <h1 className='text-xs text-black font-medium'>{`${data.user.UserName.slice(0,8)}..`}</h1>
      </div> 
  )
}
