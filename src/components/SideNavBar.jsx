import React from 'react'
import { BiMoviePlay, BiSolidMessageRoundedDots } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { FaUserGroup } from 'react-icons/fa6'
import { IoMdArrowRoundBack, IoMdHome } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function SideNavBar() {
  const navigate=useNavigate()
  const {UserName,avatar}=useSelector(state=>state?.auth?.user)
  const url= window.location.pathname.split('/')
  return (
      <div className="min-w-[25%] h-screen text-3xl bg-white hidden md:block">
            <div className="flex flex-col gap-2 my-4"> 
              {/* back button */}
            <Link to="/" className={`flex gap-5 items-center py-2 px-6 ${url[url.length-1]=="reels"?"block":"hidden"}`}>
              <IoMdArrowRoundBack title='back' className='cursor-pointer' onClick={()=>navigate(-1)} />
              <p className="text-lg font-bold text-black">Reels</p>
            </Link>  

            <Link to="/" className={`${url[url.length-1]==''&&"text-indigo-700"}  flex gap-5 items-center hover:bg-slate-200/50 py-2 px-6`}>
              <IoMdHome />
              <p className="text-lg font-bold">Home</p>
            </Link>                                     
            <Link to="/reels" className={`${url[url.length-1]=='reels'&&"text-indigo-700"}  flex gap-5 items-center hover:bg-slate-200/50 py-2 px-6`}>
              <BiMoviePlay />  
              <p className="text-lg font-bold">Reels</p>       
            </Link>
            <Link to="/friendRequest" className="flex gap-5 items-center hover:bg-slate-200/50 py-2 px-6">
              <FaUserGroup />
              <p className=" text-lg font-bold ">Friends</p>
            </Link>
            <Link to="/direct" className="flex gap-5 items-center hover:bg-slate-200/50 py-2 px-6">
            <BiSolidMessageRoundedDots/>
              <p className="text-lg font-bold ">Message</p>
            </Link>
           {/* profile */}
           <Link to={`/${UserName}`} className={`${url[url.length-1]==UserName&&"text-indigo-700"}  flex gap-5 items-center hover:bg-slate-200/50 py-2 px-6`}>
          <img
            src={avatar}
            className="size-10 border-black rounded-full border-2"
            />
              <p className="text-lg font-bold ">Profile</p>
            </Link>
            </div>
          </div>
  )
}
