import React from 'react'
import {IoMdHome} from 'react-icons/io'
import {BiMoviePlay, BiSolidBookOpen} from 'react-icons/bi'
import {FaUserGroup} from 'react-icons/fa6'
import {IoIosNotificationsOutline} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import { CgAddR} from 'react-icons/cg'
import {GrSearch} from 'react-icons/gr'
import {BiSolidMessageRoundedDots} from "react-icons/bi"
import {PiNotePencilFill} from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
export default function NabigationBar({user}) {
  function slideOpenHandler(){
    if(document.getElementById('postSlide').style.width=="8rem"){
    document.getElementById('postSlide').style.width="0px"
  }else{
     document.getElementById('postSlide').style.width="8rem"
  }
  }
  function slideCloseHandler(){
    document.getElementById('postSlide').style.width="8rem"
  }
  const navigate=useNavigate()  
  return (
    <div className='flex flex-col gap-4'>
    <div className='flex px-4 justify-between border-b-2 pb-2'>
      <div className='font-bold text-2xl text-[#0846fe]'>Exploser</div>
      <div className='flex items-center gap-4 text-2xl'>
        <CgAddR className='' onClick={slideOpenHandler}/>
        <GrSearch onClick={()=>navigate('/search')}/>
        <BiSolidMessageRoundedDots onClick={()=>navigate('/chat')}/>
        <div id='postSlide' className='w-[0px] absolute flex flex-col py-3 gap-2 rounded-lg top-8 right-2 bg-slate-200'>
         <div onClick={()=>navigate("/createPost",{state:user})} className='flex gap-2 cursor-pointer px-3 pr-6 items-center border-b-2 border-black'>
          <PiNotePencilFill/>
            <h2>Post</h2>
         </div>
         <div onClick={()=>navigate("/createStory")} className='flex gap-2 px-3 pr-6 cursor-pointer items-center border-b-2 border-black'>
          <BiSolidBookOpen/>
            <h2>Story</h2>
         </div>
         <div onClick={()=>navigate('/createReel')} className='flex px-3 pr-6 cursor-pointer items-center gap-2 '>
          <BiMoviePlay/>
            <h2>Reel</h2>
         </div>
       </div>
      </div>
     
    </div>
      <div className='flex justify-evenly text-3xl border-b-4 pb-2'>
      <IoMdHome/>
       <BiMoviePlay onClick={()=>navigate('/reels')}/>
       <FaUserGroup onClick={()=>navigate('/friendRequest')}/>
       <IoIosNotificationsOutline onClick={()=>navigate('/notification')}/>
     <div onClick={()=>navigate('/profile',{state:user._id})} className='w-8 h-8 rounded-full'>
     {user.avatar?<img src={user.avatar} className='w-full h-full border-2'/>:
       <CgProfile className='h-full w-full'/>
       }
     </div>
      </div>
    </div>
  )
}
