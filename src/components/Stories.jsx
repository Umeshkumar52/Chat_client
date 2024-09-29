import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Stories({data}) {
  const navigate=useNavigate()
  return ( 
      <div onClick={()=>navigate('/stories',{state:data})} className='storyMain'>
      <div className='relative'>
       <div className='w-[65px] h-[65px] rounded-full bg-gradient-to-r from-[#ff2e2e] to-[#cb0eff] p-[3px]'>
        <img src={data.author.avatar} className='w-full h-full rounded-full bg-white'/>
       </div>
  </div>
      <h1 className='text-sm text-black font-medium'>{data.author.UserName}</h1>
      </div> 
  )
}
