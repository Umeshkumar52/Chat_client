import React from 'react'

export default function ReelCardPulse() {
  return(
    <div className='relative w-full h-[50vh] p-4 animate-pulse'>
        <div className='h-[70%] w-full rounded-lg bg-slate-200'>
        </div>
       <div className='absolute bottom-4 flex gap-2'>
       <div className='w-14 h-14 rounded-full bg-slate-200'>
            {/* picture */}
        </div>
        <div className='flex flex-col gap-3'>
       <div className='flex gap-3'>
       <h1 className='w-28 h-6 rounded-lg bg-slate-200'>
            {/* name */}
        </h1>
        <h2  className='w-20 h-6 rounded-lg bg-slate-200'>
            {/* fololow */}
        </h2>
       </div>
       <div className='w-full h-4 rounded-full bg-slate-200'></div>
       </div>
       </div>      
    </div>
  )
}
