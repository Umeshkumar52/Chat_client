import React, { useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import {MdCancel} from 'react-icons/md'
import videoPlayer from '../helper/videoPlayer'
import PlayPause from '../components/PlayPause'
export default function ChatMessageMedia({file,inputResetHandler,sendChat}) {
  const videoRef=useRef(null)
  const[isPlaying,setIsplaying]=useState(true)
  const[playButtonShowing,setPlayButtonShowing]=useState(false)
  return (
    <div className='w-full top-0 bg-black flex flex-col items-center justify-center h-[100vh] absolute'>
      <MdCancel onClick={()=>inputResetHandler(null)} className='text-3xl fixed top-6 left-6 hover:text-red-600 '/>
      {(file.file_type=="image/jpg" ||file.file_type=="image/png")?
        <img src={file.url} className='w-full max-h-[85vh]'/>:
          <div className='relative flex w-fit'>
         <video className='w-full max-h-[85vh]' src={file.url} onClick={()=>videoPlayer(isPlaying,setIsplaying,videoRef,setPlayButtonShowing)} ref={videoRef}  autoPlay autoSave="true"/>
        { playButtonShowing?<PlayPause/>:""}
         </div>
       }      
        <form onSubmit={sendChat} className='fixed bottom-4 right-4 w-full flex justify-end'>  
          <div className="h-10 w-10 flex justify-center items-center rounded-full bg-[#2eff35] text to-black">
          <button type="submit"><FiSend className="h-6 w-6 text-black font-semibold"/></button>
          </div>
          </form> 
    </div>
  )
}
