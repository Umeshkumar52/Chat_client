import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import NabigationBar from '../components/NavigationBar'
import Stories from '../components/Stories'
import MediaCard from '../components/MediaCard'
import { allSocialPost, allStories } from '../reducers/socialPostController'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoMdAdd } from 'react-icons/io'
import { PiNotePencilFill } from 'react-icons/pi'
import { BiMoviePlay, BiSolidBookOpen } from 'react-icons/bi'
export default function Home() {
  // const location=useLocation()
  const{user}=useSelector((state)=>{
    return state.auth    
  })    
  function slideCloseHandler(){
    document.getElementById('postSlide').style.width="0rem"
  }
  let storyGroup={}
  function filterUserStories(stories){
    stories.forEach((Element,index)=>{      
       if(!storyGroup[Element.author.UserName]){
         storyGroup[Element.author.UserName]={
           user:Element.author,
           story:[]
         }
       }
       storyGroup[Element.author.UserName].story.push(Element.secure_url)       
    })       
}
  const[stories,setStories]=useState([])
  const[yourStory,setYourStory]=useState([])
  const navigate=useNavigate()  
  const[post,setPost]=useState([])
  const dispatch=useDispatch()
  async function allPosts(){
    const response=await dispatch(allSocialPost())
    const story=await dispatch(allStories())
    if(response.payload && story.payload){
    setStories((stories)=>[...stories,...story.payload.data.message])
    setPost((post)=>[...post,...response.payload.data.message])    
  }
    }
  useEffect(()=>{
    allPosts()
  },[user]) 
  filterUserStories(stories)
  // useEffect(()=>{
  //   console.log(window.scrollY);
    
  //     const savedScrollPosition=sessionStorage.getItem(location.key)    
  //     if(savedScrollPosition){
  //       window.scrollTo(0,parseInt(savedScrollPosition,10))
  //     }return ()=>{
  //       sessionStorage.setItem(location.key,window.scrollY)
  //     }
  // },[location]) 
   return (
     <div onScroll={slideCloseHandler} className='hiddenScrollBar relative w-full h-screen overflow-y-scroll space-y-6 text-black'>
        {/* Nabigation Bar */}
        <div className='relative'>
     <NabigationBar user={user}/>
     {/* Stories Pannel */}
     <div className='stories w-full space-x-4 px-3 py-2 border-b-2'>
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
      {Object.values(storyGroup).length>0?
      Object.values(storyGroup).map((Element,index)=>{
        return <Stories key={index} data={Element}/>
      }):""
      }      
   </div>
   {/* post menu slide */}
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
   {/* Posts */}
     <div onClick={slideCloseHandler} className='flex flex-col gap-10'>
  {post.length>0?
   post.map((Element,index)=>{
     return <MediaCard key={index} index={index} data={Element}/>
  }):""
     }
     </div>
    </div>
  )
}
