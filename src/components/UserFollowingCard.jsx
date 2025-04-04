import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function UserFollowingCard({data}) {
  const navigate=useNavigate()
  return (
    <div onClick={()=>navigate(`/${data.UserName}`)} className='w-full flex cursor-pointer hover:bg-slate-100 items-center gap-4 h-fit py-2 px-[1rem] ' >
      <div className='w-full flex items-center gap-3'>
      <img  className='h-10 w-10 rounded-full' src={data.avatar}/>
      <div>
      <h2 className='text-lg font-semibold '>{`${data.UserName.slice(0,10)}..`}</h2>
      <h2 className='text-sm font-medium text-slate-500 '>{data.Name}</h2>
      </div>
     </div>
    </div>
  )
}
