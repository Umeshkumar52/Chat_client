import React from 'react'
export default function Spinner() {
  return (
    <div className='absolute top-1/2 left-1/2' disabled>
     <svg className='loading animate-spin h-10 w-10 border-b-green-600 border-b-2 rounded-full border-current'></svg>
    </div>
  )
}
