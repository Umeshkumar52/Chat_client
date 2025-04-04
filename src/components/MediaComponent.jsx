import React, { useRef, useState } from 'react'
import videoPlayer from '../helper/videoPlayer'
import { FaPause, FaPlay } from 'react-icons/fa'
import PlayPause from './PlayPause'

export default function MediaComponent({data}) { 
const videoRef=useRef(null)
const[isPlaying,setIsplaying]=useState(false)
const [playButtonShowing,setPlayButtonShowing]=useState(false)
  return (
    <div className='relative bg-black'>
        {(data.url_type=="jpg" ||data.url_type=="png")?
        <img src={data.secure_url} className="w-[250px] min-h-[300px]  max-h-[350px] rounded-lg"/>:
        <div className='relative'>
        <video ref={videoRef} onClick={()=>videoPlayer(isPlaying,setIsplaying,videoRef,setPlayButtonShowing)} src={data.secure_url} className="relative w-[250px] min-h-[300px] max-h-[350px] rounded-lg" id='chat_video'/>
         {playButtonShowing?(
                  <PlayPause isPlaying={isPlaying}/>
                 ) : (
                   ""
                 )}
        </div>
        }
        </div>
  )
}
