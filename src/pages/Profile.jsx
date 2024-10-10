import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser, userAndPosts } from '../reducers/authReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import MediaCard from '../components/MediaCard';
import ReelsCard from '../components/ReelsCard'
import {IoCameraOutline} from 'react-icons/io5'
import MessagerUserList from '../helper/MessagerUserList';
import { CgProfile } from 'react-icons/cg';
export default function Profile() {
  const [profileBannerUrl,setProfileBannerUrl]=useState()
  const[profileUrl,setProfileUrl]=useState()
  const[userUpdated,setUserUpdated]=useState(false)
  const sender=useSelector((state)=>{
    return state.auth.user
  })    
  const {state}=useLocation()  
  const [user,setUser]=useState()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[selector,setSelector]=useState()
  const[friends,setFriends]=useState()
 async function profileBannerHandler(event){
        event.preventDefault()     
        const formData=new FormData()
        formData.append(`file`,event.target.files[0])
        formData.append("type","banner")
        formData.append("_id",user._id)
        setProfileBannerUrl(URL.createObjectURL(event.target.files[0]))
        const response=await dispatch(updateUser(formData))
        setUserUpdated(true)
  }
  async function profileHandler(event){
    event.preventDefault()
    const formData=new FormData()
    formData.append('file',event.target.files[0])
    formData.append("type","profile")
    formData.append("_id",user._id)
    setProfileUrl(URL.createObjectURL(event.target.files[0]))
    const response=await dispatch(updateUser(formData))
    setUserUpdated(true)
  }
  async function userDetail() {
    const response=await dispatch(userAndPosts(state))
    if(response.payload){
    setFriends(eval(response.payload.data.message.Following.length+response.payload.data.message.Followers.length))
    setUser(response.payload.data.message)   
    }
  }
  async function logoutHandler(event){
    event.preventDefault()
    const response=await dispatch(logout())
    if(response.payload.data.message){
      navigate('/')
    }
  }
  useEffect(()=>{
    userDetail()
  },[userUpdated])           
  return (
    <div className='hiddenScrollBar py-2 w-full h-screen overflow-y-scroll'>
    {user?
    <div className='w-full'>
     <div className='p-2'>
      <IoIosArrowBack onClick={()=>navigate(-1)} className='text-3xl'/>
     </div>
     <div className='relative'>
      <div className='relative ring-2 ring-indigo-600 bg-slate-200/40 h-[9rem] w-full'>
      {/* {profileBannerUrl || user.profileBanner? */}
       <img className='w-full h-full' src={profileBannerUrl?profileBannerUrl:user.profileBanner}/>:
      {/* } */}
        <label  htmlFor="profileBanner">
        <IoCameraOutline className='absolute text-3xl right-4 bottom-0'/>
        </label>
        <input type='file' onChange={profileBannerHandler} className='hidden' id='profileBanner' name='profileBanner'/>
      </div>
    <div className='absolute flex justify-center items-center top-[5rem] left-[1rem] rounded-full'>
      <label htmlFor='profile'>
     {profileUrl || user.avatar?
      <img className='w-[8rem] h-[8rem] border-2 rounded-full' src={profileUrl?profileUrl:user.avatar} alt="" />:
      <img className='w-[8rem] h-[8rem]  border-2 rounded-full' src="#" alt="" />
     }
     </label>
      <input onChange={profileHandler} type='file' id='profile' className='hidden' name='profile'/>
    </div>
      <div className='relative pt-[4rem] gap-3 flex flex-col px-3 pb-[1rem] border-b-2'>
       <div >
        <h1 className='text-xl font-bold text-black'>{user.UserName}</h1>
        <div className='flex gap-4 text-lg font-semibold'>
          <h2 className='text-indigo-700'>Friends</h2>
          <p>{friends}</p>
         </div>
        </div>
        <div className='flex justify-evenly'>
         {true?
          <button onClick={()=>{
            MessagerUserList(user)
            navigate(`/direct/${sender.UserName}/inbox/${user.UserName}`,{state:user})
          }} className='bg-indigo-600 rounded-lg text-white text-lg font-semibold px-4 py-1'>Message</button>:
          <button onClick={()=>navigate('/createStory')} className='bg-indigo-600 rounded-lg text-white text-lg font-semibold px-4 py-1'>Add Story</button>
          }
          <button onClick={logoutHandler} className='bg-[#9c2df1] rounded-lg text-white text-lg font-semibold px-4 py-1'>Logout</button>
        </div>
      </div>
     </div>
     <fieldset className='w-full space-y-6 py-2'>
     {/* post Area */}
      <input id='post' defaultChecked className='peer/post hidden' name='status' type="radio" />
      <label htmlFor="post" className='peer-checked/post:text-sky-500 text-lg font-semibold px-4'>Post</label>
      <input id='reels' className='peer/reels hidden' name='status' type="radio" />
      <label htmlFor="reels" className='peer-checked/reels:text-sky-500 text-lg font-semibold'>Reels</label>
      <hr/>
     {/* post Card */}
     <div className='hidden peer-checked/post:block space-y-10'>
    {(user.myPosts.length>0)?
      user.myPosts.map((Element,index)=>{
       return <MediaCard self={true} index={index} key={index} data={Element} />
      }):<div className='w-full h-full flex justify-center items-center'>No posts</div>
    }
     </div>
     {/* ReelsCard */}
     <div className='hidden peer-checked/reels:block space-y-10'>
    {(user.myReels.length>0)?
      user.myReels.map((Element,index)=>{
       return <ReelsCard key={index} self={true} index={index} data={Element} />
      }):<div className='w-full h-full flex justify-center items-center'>No Reels</div>
    }
     </div>
     </fieldset>
    </div>:""}
    </div>
  )
}
