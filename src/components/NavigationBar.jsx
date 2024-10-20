import React from 'react'
import {IoMdHome} from 'react-icons/io'
import {BiMoviePlay} from 'react-icons/bi'
import {FaUserGroup} from 'react-icons/fa6'
import {IoIosNotificationsOutline} from 'react-icons/io'
import {CgProfile} from 'react-icons/cg'
import { CgAddR} from 'react-icons/cg'
import {GrSearch} from 'react-icons/gr'
import {BiSolidMessageRoundedDots} from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom'
export default function NabigationBar({user}) {
  function slideOpenHandler(){
    if(document.getElementById('postSlide').style.width=="8rem"){
    document.getElementById('postSlide').style.width="0px"
  }else{
     document.getElementById('postSlide').style.width="8rem"
  }
  }
  const navigate=useNavigate() 
  return (
    <div className='flex flex-col gap-4'>
    <div className='flex px-4 justify-between border-b-2 pb-2'>
      <div className='font-bold text-transparent bg-clip-text text-2xl bg-gradient-to-r from-[#0846fe] from-25% to-[#ff0505]'>Eangager</div>
      <div className='flex items-center gap-4 text-2xl'>
        <CgAddR className='' onClick={slideOpenHandler}/>
        <GrSearch onClick={()=>navigate('/search')}/>
        <BiSolidMessageRoundedDots onClick={()=>navigate('/direct')}/>
      </div>
     
    </div>
      {/* <div className='flex justify-evenly text-3xl border-b-4 pb-2'>
      <Link to='/'> <IoMdHome/></Link>
      <Link to='/reels'><BiMoviePlay/></Link>
       <Link to='friendRequest'><FaUserGroup/></Link>
       <Link to='notification'> <IoIosNotificationsOutline/></Link>
     <Link to={`/${user.UserName}`} className='w-8 h-8 rounded-full'>
     {user.avatar?<img src={user.avatar} className='w-full h-full border-black rounded-full border-2'/>:
       <CgProfile className='h-full w-full'/>
       }
     </Link>
      </div> */}
    </div>
  )
}
