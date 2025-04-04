import React from 'react'
import SideNavBar from '../components/SideNavBar'

export default function ReelsLayouts({children}) {    
  return (
    <div className='w-full flex gap-10'>
        <SideNavBar/>
       <div className='w-full md:w-[80%] h-[100vh] flex justify-center'>
       {children}
       </div>
    </div>
  )
}
