import React from 'react'
import {TbLoader2} from 'react-icons/tb'
export default function LoadingSpinner(size) {
  return (
    <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#1111] flex justify-center items-center'>
        <TbLoader2 className='animate-spin  size-16'/>
    </div>
  )
}
