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
      <div className=' w-fit px-4 py-2 font-semibold text-base text-white border-dotted border-2 border-[#ff3a3a]  rounded-full bg-[#5029ff]'>
      Posted
    </div>
    </div>
  )
}

