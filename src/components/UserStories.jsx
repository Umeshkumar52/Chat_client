import React, { useEffect, useRef, useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {FiSend} from 'react-icons/fi'
import videoPlayerHandler from '../helper/videoPlayerHandler'
import { FcLike} from "react-icons/fc";
import { FaRegHeart } from 'react-icons/fa6';
export default function UserStories() {
  const[Reply,setReply]=useState()
  const[isLiked,setIsLiked]=useState(false)
 const{state}=useLocation()  
 const[isPlaying,setIsPlaying]=useState(true)
 const navigate=useNavigate()
 const videoRef=useRef(null)
 videoPlayerHandler("video")
 function videoPlayer(){
  if(isPlaying){
    videoRef.current.play().catch((Error)=>{
     return
    })
    setIsPlaying(false)
  }
 }
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
  useEffect(()=>{
    // videoPlayer()
    videoPlayerHandler("video")
  },[])
  async function replyHandler(event) {
    event.preventDefault()
    setReply("")
  }
  return(
    <div className='w-full h-screen whitespace-nowrap overflow-auto'>     
    {state.story.map((Element,index)=>{
      if(index==0){
      return  <div key={index} id={`story${index}`} onClick={formNum[index]} onEnded={formNum[index]} className='absolute flex justify-center items-start h-full w-full'>
          <div className='relative w-[300px]'>
          <div onClick={()=>navigate(`/${state.user.UserName}`)} className='w-full cursor-pointer fixed top-4 flex gap-4 items-center'>
          <img className=' w-12 h-12 rounded-full border-2' src={state.user.avatar}/>
           <h2 className='font-semibold text-lg text-[#f8f1f1]'>{state.user.UserName}</h2>
          </div>
          <video id='video' ref={videoRef} src={Element}/>
        </div>
        </div>
      }else{
        return <div key={index} id={`story${index}`} onClick={formNum[index]} onEnded={formNum[index]} className='absolute -right-[65rem] flex justify-center items-start w-full h-full'>
        <div className='relative w-[300px]'>
        <div onClick={()=>navigate(`/${state.user.UserName}`)} className='w-full cursor-pointer fixed top-4 flex gap-4 items-center'>
     <img className=' w-12 h-12 rounded-full border-2' src={state.user.avatar}/>
     <h2 className='font-semibold text-lg text-[#f8f1f1]'>{state.user.UserName}</h2>
     </div>
        <video id='video' ref={videoRef} src={Element} />
       </div>
        </div>
      }
    })}
    {/* profile pic */}
     {/* <div onClick={()=>navigate(`/${state.user.UserName}`)} className='fixed top-4 flex gap-4 items-center'>
     <img className=' w-12 h-12 rounded-full border-2' src={state.user.avatar}/>
     <h2 className='font-semibold text-lg text-[#f8f1f1]'>{state.user.UserName}</h2>
     </div> */}
     {/* form  */}
     <div className='w-full fixed flex bg-slate-800 items-center bottom-0 justify-between'>
     <form onSubmit={replyHandler} className='w-full flex gap-3 items-center' action="">
     <input onChange={(event)=>{
      event.preventDefault()
      setReply(event.target.value)
     }} value={Reply} placeholder='Reply...' type='text' className='p-2 ring-2 border-2 border-slate-700 focus:ring-2 focus:ring-[#372cff] bg-slate-800 text-white font-medium text-lg rounded-2xl'/>
     {Reply?
     <button type='submit' className='bg-slate-800 text-white p-1 flex justify-center items-center w-fit h-fit rounded-full'>  
      <FiSend className='text-3xl'/>
      </button>:<div className='text-white text-3xl'>
      {isLiked?<FcLike onClick={()=>setIsLiked(false)}/>:
      <FaRegHeart onClick={()=>setIsLiked(true)}/>}
      </div>    
     }
     </form>     
     </div>
    </div>
  )
}
