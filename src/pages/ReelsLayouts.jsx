import React from 'react'
import SideNavBar from '../components/SideNavBar'

export default function ReelsLayouts({children}) {    
  return (
    <div className='w-full md:flex overflow-hidden'>
        <SideNavBar/>
       <div className='w-full flex justify-center md:w-[80%]'>
       {children}
       </div>
    </div>
  )
}
