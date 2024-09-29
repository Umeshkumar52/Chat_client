import React from 'react'
import { useDispatch } from 'react-redux'
export default function FriendsCard({data}) {
  const dispatch=useDispatch()
 async function friendReqHandler() {

 }
  return (
    <div className='w-full flex gap-4'>
      <img className='w-20 h-20 bg-green-300 rounded-full' src={data.requester.avatar}/>
     <div className='flex flex-col gap-2'>
      <h2 className='text-xl font-medium'>{data.requester.UserName}</h2>
      <div className='flex gap-2'>
      <button className='py-1 w-[6rem] bg-indigo-600 text-white font-semibold text-base rounded-lg' onClick={friendReqHandler}>Confirm</button>
        <button className='py-1 w-[6rem] bg-slate-200 text-black font-semibold text-base rounded-lg'>Reject</button>
      </div>
      </div>
    </div>
  )
}
