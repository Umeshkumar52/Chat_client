import React, { useEffect, useRef, useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import {FiSend} from 'react-icons/fi'
import videoPlayerHandler from '../helper/videoPlayerHandler'
export default function UserStories() {
  const[Reply,setReply]=useState()
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
     document.getElementById(`story${i}`).style.left="-50rem"
     document.getElementById(`story${i+1}`).style.right="0rem"
      }else{
        navigate(-1)
      }})
    }
  useEffect(()=>{
    videoPlayer()
  },[])
  return(
    <div className='w-full whitespace-nowrap overflow-auto'>
    {state.story.map((Element,index)=>{
      if(index==0){
      return  <div key={index} id={`story${index}`} onClick={formNum[index]} onEnded={formNum[index]} className='absolute inline-block w-full'>
          <video id='video' ref={videoRef} src={Element} className='w-full h-screen' />
        </div>
      }else{
        return <div key={index} id={`story${index}`} onClick={formNum[index]} onEnded={formNum[index]} className='absolute -right-[50rem] inline-block w-full'>
        <video id='video' ref={videoRef} src={Element} className='w-full h-screen'/>
        </div>
      }
    })}
     <div className='fixed top-4 flex gap-4 items-center'>
     <img className=' w-12 h-12 rounded-full border-2' src={state.user.avatar}/>
     <h2 className='font-semibold text-xl text-[#f8f1f1]'>{state.user.UserName}</h2>
     </div>
     <div className='w-full fixed flex items-center bottom-1 justify-between'>
     <form className=' w-full flex gap-3 items-center' action="">
     <input onChange={(event)=>setReply(event.target.value)} placeholder='Reply...' type='text' className='p-2 border-2 border-slate-700 focus:ring-2 focus:ring-[#372cff] bg-slate-800 text-white font-medium text-lg rounded-2xl'/>
     {Reply?
     <div className='bg-slate-800 text-white p-1 flex justify-center items-center w-fit h-fit rounded-full'>  
      <FiSend className='text-3xl'/>
      </div>:""      
     }
     </form>     
     </div>
    </div>
  )
}
