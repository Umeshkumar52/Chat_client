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
      <div className=' w-fit px-4 py-2 italic font-medium border-2 border-dotted text-base text-white  rounded-full bg-indigo-700/100'>
       You shared a post
    </div>
    </div>
  )
}

