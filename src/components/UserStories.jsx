import React, {useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {FiSend} from 'react-icons/fi'
import { FcLike} from "react-icons/fc";
import { FaRegHeart } from 'react-icons/fa6';
import {GrNext,GrPrevious} from 'react-icons/gr'
import { IoMdArrowBack } from 'react-icons/io';
 function UserStories() {
  const[Reply,setReply]=useState()
  const[isLiked,setIsLiked]=useState(false)
 const{state}=useLocation()  
 const[videos,setVideos]=useState(state.story)
 const navigate=useNavigate()
 const[storyNumber,setStoryNum]=useState(0)
 console.log(videos);
 
 let formNum=[]
  for(let i=0;i<state.story.length;i++){
   formNum.push(
    function(){
      if(i<state.story.length-1){
     document.getElementById(`story${i}`).style.left="-65rem"
     document.getElementById(`story${i+1}`).style.right="0rem"
      }else{
        navigate(-1)
      }})
    }
  async function replyHandler(event) {
    event.preventDefault()
    setReply("")
  }  
  function nextVideo(){
   if(videos.length>storyNumber+1){
    setStoryNum(prev=>prev+1)
   }else{
    navigate(-1)
  }
  }
  function prevVideo(){
    if(storyNumber>0){
     setStoryNum(prev=>prev-1)
    }else{
      navigate(-1)
    }
   }
   function userClick(event){
    event.preventDefault()
    const windowWidth=window.innerWidth
    const clickX=event.clientX;
    if(windowWidth<766){
    if(clickX>windowWidth/2){
     nextVideo()
    }else{
      prevVideo()
    }}
   }  
  return(
     <div className='relative flex justify-center w-full h-[100vh] '>
      <div className='hidden md:block space-x-4 fixed items-center gap-4 left-2 top-4 text-2xl font-semibold italic'>
        <IoMdArrowBack onClick={()=>navigate(-1)} className='text-4xl inline'/>
        <h1 className='inline'>
          Story
        </h1>
      </div>
      <div className="relative w-fit bg-black h-[100vh]">
       
      <video onClick={userClick} src={videos[storyNumber]} autoPlay className={`h-[100vh] w-full md:w-[60vw] lg:w-[30vw]`} onEnded={nextVideo}/>
    
      <GrPrevious onClick={prevVideo} className='absolute left-0 hidden p-1 md:block hover:bg-slate-300 bg-slate-400 text-5xl text-black  top-1/2 rounded-full'/>
      <GrNext onClick={nextVideo} className='absolute right-0 hidden md:block p-1 hover:bg-slate-300 text-black text-5xl bg-slate-400 top-1/2 rounded-full'/>
      <div className='fixed top-2 pl-3'>
       <div onClick={()=>navigate(`/${state?.user?.UserName}`)} className='flex gap-3 items-center'>
       <img className='size-14 rounded-full border-2' alt='profile' src={state.user.avatar}/>
       <h1 className='text-lg text-slate-200 font-semibold'>{state?.user?.UserName}</h1>
       </div>
       
      </div>
      {/* Form */}
      <form onSubmit={replyHandler} className='fixed bottom-1 w-full md:w-[60vw] lg:w-[30vw] px-1 flex gap-2 items-center' action="">
     <input onChange={(event)=>{
      event.preventDefault()
      setReply(event.target.value)
     }} value={Reply} placeholder='Reply...' type='text' className='p-4 w-full text-xl rounded-lg border-2 hover:border-indigo-400 font-mediumoutline-none'/>
     {Reply?
     <button type='submit' className='text-white p-1 text-6xl flex justify-center items-center w-fit h-fit rounded-full'>  
      <FiSend className='text-3xl'/>
      </button>:<div className='text-white text-6xl'>
      {isLiked?<FcLike onClick={()=>setIsLiked(false)}/>:
      <FaRegHeart onClick={()=>setIsLiked(true)}/>}
      </div>    
     }
     </form>  
      </div>
      </div>
   
  )
}
export default UserStories
