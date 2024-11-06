import React, { useEffect } from 'react'
import audioSound from '../asets/postSound.wav'
export default function PostedAlert() {
useEffect(()=>{
      if(audioSound){
  new Audio(audioSound).play()
      }
},[])
  return (
    <div className='w-full fixed bottom-20 flex items-center justify-center'>
      <div className=' w-fit px-4 py-2 font-normal text-base text-white  rounded-full bg-[#3931cc]'>
       You share a post
    </div>
    </div>
  )
}

