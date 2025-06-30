import React, { useRef, useState } from 'react'
import videoPlayer from '../helper/videoPlayer'
import PlayPause from './PlayPause'
import {MdClose} from 'react-icons/md'
import {useDispatch, useSelector} from 'react-redux'
import handleDownload from '../hooks/useDownload'
import { updateChate } from '../reducers/conversationReducer'
export default function MediaComponent({data}) {
  const dispatch=useDispatch() 
const {user}=useSelector((state)=>state.auth)
const videoRef=useRef(null)
const[isPlaying,setIsplaying]=useState(false)
const [playButtonShowing,setPlayButtonShowing]=useState(false)
  return (
    <div className='relative min-w-[270px] flex justify-center items-center max-w-[400px] min-h-[300px] bg-black'>
        {(data.url_type=="jpg" ||data.url_type=="png")?
        <img src={data.secure_url} className="rounded-lg w-full h-full"/>:
        <div className='relative'>
        <video onLoad={async()=>{
          if(data.isRead && user.UserName==data.reciever_id
          ){
            handleDownload(data.secure_url)
           await dispatch(updateChate,{state:data._id})
          }
        }} className="rounded-lg w-full h-full  max-h-[400px]" id='chat_video' ref={videoRef} onClick={()=>videoPlayer(isPlaying,setIsplaying,videoRef,setPlayButtonShowing)} src={data.secure_url}/>
         {playButtonShowing&&(
                  <PlayPause isPlaying={isPlaying}/>
                 )}
        </div>
        }
        {/* {true?
          <div className='rounded-full text-4xl absolute top-[44%] left-[44%] border-4 border-green-600'>
          <MdClose/>
          </div>:""
        } */}
       
        </div>
  )
}
