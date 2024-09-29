import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import {FaRegComment, FaRegHeart} from 'react-icons/fa6'
import {MdVolumeUp,MdVolumeOff} from 'react-icons/md'
import { following } from "../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import WebShare from "../helper/WebShare";
import { likeReel } from "../reducers/reelsReducer";
export default function ReelsCard({data}) {  
  const user=useSelector((state)=>{return state.auth.user})
  const navigate=useNavigate()
  const[isFollowing,setIsFollowing]=useState(false)
  const[isLiked,setIsLiked]=useState(false)
  const[comments,setComments]=useState([])
  const[isPlaying,setIsPlaying]=useState(false)
  const[post_id,setPost_id]=useState()
  const dispatch=useDispatch()
  const videoRef=useRef(null)
  // const commentDetail={post_id:data._id,user_id:user_id}
  function videoPlayingHandler(){
    if(isPlaying){
      videoRef.current.pause()
      setIsPlaying(false)
    }else{
      videoRef.current.play()
      setIsPlaying(true)
    }
   }   
   async function followingHandler() {
     await dispatch(following({requester:user._id,reciever:data.author._id}))     
   }   
   async function reelLikeHandler() {
   const response= await dispatch(likeReel({post_id:data._id,author:user._id}))    
  }      
   useEffect(()=>{
    if(data.author.Followers){
   data.author.Followers.map((Element)=>{
     if(Element ==user._id){
      setIsFollowing(true)
     }
   })}   
   if(data.likes){
    data.likes.map((Element)=>{
      if(Element ==user._id){
       setIsLiked(true)
      }
    })
  }
   },[])
   useEffect(()=>{
     socket.on("following",(following)=>{
      if(data.author._id==following.reciever){
       setIsFollowing(true)
        }
     })
     socket.on("reelLike",(data)=>{
      console.log(data);
      if(data.liked==user._id){
        setIsLiked(true)
      }
     })
   },[socket])
   console.log(data);
   
  return (
    <div className="flex shadow-sm flex-col gap-3">
      <div className="flex justify-center flex-col gap-1 px-2">
        <div className="flex gap-3">
          <div onClick={()=>navigate('/profile',{state:data.author._id})} className="flex">
            {data.author.avatar?
            <img src={data.author.avatar} className="w-10 h-10 rounded-full border-2" />: <CgProfile className="text-4xl" />      
            }
          </div>
          <div className="flex flex-col">
            <div className=" flex gap-2">
              <h2 className="font-semibold text-sm text-black">{data.author.UserName}</h2>
              {!isFollowing?
              <button onClick={followingHandler} className="font-semibold text-[#0846fe]">Follow</button>:
              <button disabled className="font-semibold text-[#0846fe]">Following</button>
              }
            </div>
           <h1 className="text-xs font-medium text-slate-600 italic">Original music</h1>
          </div>
        </div>
      </div>
      {/* video show here */}
      <div className="relative w-full">
        <video src={data.secure_url} ref={videoRef} loop onClick={videoPlayingHandler} className="w-full"></video>
        <div className='absolute p-2 bg-slate-700 rounded-full text-white right-4 bottom-6'>
          {true?<MdVolumeUp/>:<MdVolumeOff/>}
        </div>
      </div>
      {/* sharing thoghts section */}
      <div className="flex flex-col px-3">
      <div className="space-y-2">
      <div className="flex gap-4 text-3xl px-3">
         <div onClick={reelLikeHandler}>
         {isLiked?
          <FcLike/>:
          <FaRegHeart/>
         }
      </div>
          <FaRegComment onClick={(event)=>{
        event.preventDefault()
        navigate('/reelComments',{state:{post_id:data._id,user:{UserName:user.UserName,avatar:user.avatar,_id:user._id},type:"Reel"}})
       }
        }/>
          <WebShare/>
        </div>
      <h1>{`${data.Comments.length} Comments`}</h1>
      </div>
        <div className="inline text-sm">
        <h4>{data.tittle}</h4>
        <h4>{`${data.likes.length} likes`}</h4>
        <h4>{data.updatedAt.split('T')[0]}</h4>
        </div>
      </div>
    </div>
  );
}
