import React from 'react'
import SideNavBar from '../components/SideNavBar'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
export default function ReelsLayouts({children}) { 
   const{postIsRemoving}=useSelector(state=>state.socialPost)
    const{reelIsRemoving}=useSelector(state=>state.reels) 
  return (
    <div className='w-full md:flex overflow-hidden'>
        <SideNavBar/>
       <div className='w-full flex justify-center md:w-[80%]'>
       {children}
       </div>
        {postIsRemoving || reelIsRemoving?<Loader/>:""}
    </div>
  )
}
