import React, { useEffect, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import NabigationBar from '../components/NavigationBar'
import Stories from '../components/Stories'
import MediaCard from '../components/MediaCard'
import { allSocialPost, allStories } from '../reducers/socialPostController'
import { useNavigate } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import socket from '../socket'
export default function Home() {
  const{user}=useSelector((state)=>{
    return state.auth    
  })    
  setTimeout(()=>{
    socket.auth = {userName:user.UserName};
    socket.connect();
  socket.on("connect_error", (err) => {
    if (err.message) {
      console.log("error", err.message);
    }
  })  
  },1000)
  const[stories,setStories]=useState([])
  const[yourStory,setYourStory]=useState([])
  const navigate=useNavigate()  
  const[post,setPost]=useState([])
  const dispatch=useDispatch()
  async function allPosts(){
    const response=await dispatch(allSocialPost())
    const story=await dispatch(allStories())
    setStories((stories)=>[...stories,...story.payload.data.message])
    setPost((post)=>[...post,...response.payload.data.message])}
  useEffect(()=>{
    allPosts()
  },[]) 
   return (
    <div className='hiddenScrollBar relative w-full h-screen overflow-y-scroll space-y-6 text-black'>
        {/* Nabigation Bar */}
     <NabigationBar user={user}/>
     {/* Stories Pannel */}
     <div className='stories w-full space-x-4 px-3 border-b-2'>
     <div onClick={()=>navigate('/createStory')} className='storyMain'>
    <div className='relative'>
     <div className='w-[65px] h-[65px] rounded-full bg-gradient-to-r from-[#4141e8] to-[#f706e7] p-0.5'>
      <img src={user.avatar} className='w-full h-full rounded-full bg-white'/>
     </div>
     <div className='absolute bg-blue-500 bottom-1 right-0 w-5 h-5 rounded-full'>
     <IoMdAdd className='text-xl text-white '/>
        </div>
</div>
    <h1 className='text-sm text-black font-medium'>Your story</h1>
    </div> 
      {stories.length>0?
      stories.map((Element)=>{
        return  <Stories key={Element._id} data={Element}/>
      })
      :""}      
   </div>
     <div className='flex flex-col gap-10'>
  { 
   post.map((Element,index)=>{
     return <MediaCard key={index} socket={socket} data={Element}/>
  })
     }
     </div>
    </div>
  )
}
