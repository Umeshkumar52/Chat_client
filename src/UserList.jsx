import React, { useState } from 'react'

export default function UserList({user,userCallBack}) {
  const userCall=()=>{
    console.log("user Calll");
  }
  return (
    <div className='flex flex-col gap-1'>
      {
        user.map((Element)=> {
                 return <div key={Element.userId} className='w-full cursor-pointer pl-4 bg-slate-100'>
                  <h1 className='font-semibold'>{Element.userName}</h1>
                  <h2 className='text-xs text-[#ff4848]'>Online</h2>
                </div>
                 
            
        })
      }
    </div>
  )
}
