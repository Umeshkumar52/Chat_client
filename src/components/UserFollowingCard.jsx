import React from 'react'

export default function UserFollowingCard({data}) {
  return (
    <div className='w-full flex items-center h-fit justify-between' >
      <div className='flex items-center gap-3'>
      <img className='h-10 w-10 rounded-full' src={data.avatar}/>
      <div >
      <h2 className='text-lg font-semibold '>{data.UserName}</h2>
      <h2 className='text-sm font-medium text-slate-500 '>{data.Name}</h2>
      </div>
     </div>
     <button className='w-[6rem] py-1 rounded-lg font-semibold bg-[#f0f0f0]'>Following</button>
    </div>
  )
}