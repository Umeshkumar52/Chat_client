import React, { useEffect, useState } from 'react'
import {RiWifiOffLine} from 'react-icons/ri'
export default function NoInternet(props) {
    const[online,setOnline]=useState(true)
    useEffect(()=>{
        setOnline(navigator.onLine)
    },[])
    window.addEventListener("online",()=>{
        setOnline(true)
    })
    window.addEventListener("offline",()=>{
        setOnline(false)
    })
  return (
    <div>
       {online?
       props.children:
       <div className='w-full h-screen flex justify-center items-center'>
         <div className='flex flex-col items-center'>
          <RiWifiOffLine className='text-8xl'/>
          <p className='font-bold text-3xl italic'>No Internet</p>
            </div>
       </div>
       }
    </div>
  )
}
