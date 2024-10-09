import React from 'react'
export default function LoadingSpinner() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
       <svg className='w-[5rem] h-[5rem] animate-spin border-4 border-b-white border-indigo-600 rounded-full'>
        </svg> 
    </div>
  )
}
