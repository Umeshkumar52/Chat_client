import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import {FaRegComment, FaRegHeart} from 'react-icons/fa6';
import {MdVolumeUp,MdVolumeOff} from 'react-icons/md';
import { following } from "../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import WebShare from "../helper/WebShare";
import { deleteReel, disLikeReel, likeReel } from "../reducers/reelsReducer";
import socket from "../socket";
import videoPlayerHandler from '../helper/videoPlayerHandler';
import { BsThreeDotsVertical } from "react-icons/bs";
export default function ReelsCard({data,updateDeletReeltHandler,index,self}){ 
  const dateOption={
    day:"2-digit",
    month:"short",
  }  
  let time=new Date(data.createdAt)
  const dayAndMonth=time.toLocaleDateString(undefined,dateOption) 
  const user=useSelector((state)=>{return state.auth.user})
  const navigate=useNavigate()
  const[isFollowing,setIsFollowing]=useState(false)
  const[postDeletCall,setPostDeletCall]=useState(false)
  const[isLiked,setIsLiked]=useState(false)
  const[isPlaying,setIsPlaying]=useState(false)
  const dispatch=useDispatch()
  const videoRef=useRef(null) 
  function videoplay(event){
    event.preventDefault()
    if(isPlaying){
     videoRef.current.play()
    setIsPlaying(false)
  }else{
    videoRef.current.pause()
    setIsPlaying(true)
  }
   }
  videoPlayerHandler("video")
   async function followingHandler() {
     await dispatch(following({requester:user._id,reciever:data.author._id}))     
   }   
   async function reelLikeHandler() {
   await dispatch(likeReel({post_id:data._id,author:user._id}))    
  }  
  async function reelDisLikeHandler() {
    await dispatch(disLikeReel({post_id:data._id,author:user._id}))    
   }   
  function postDeleteOpenHandler(){
    document.getElementById("reelDelete"+index).style.width='46px'
  }
  function postDeletecloseHandler(){
    if(postDeletCall){
    document.getElementById("reelDelete"+index).style.width='0px'
    }
  }   
  async function ReelDeleteHandler(){
    const response= await dispatch(deleteReel({reel_id:data._id,public_id:data.public_id}))
     if(response.payload){
      updateDeletReeltHandler(data._id)
     } 
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
     socket.on("reelLike",(likeData)=>{ 
      if(likeData==data._id){
        setIsLiked(true)
      }
     })
     socket.on("reelDisLike",(disLikeData)=>{
      if(disLikeData==data._id){
        setIsLiked(false)
      }
     })
   },[socket])  
  return (
    <div  className="vid bg-white w-full h-[100vh] flex py-4 flex-col gap-3">
      <div className="w-full px-2 flex justify-between">
        <div className="flex gap-3">
         <Link to={`/${data.author.UserName}`}>
          <div className="flex">
            {data.author.avatar?
            <img src={data.author.avatar} className="w-10 h-10 rounded-full border-2" />: <CgProfile className="text-4xl" />      
            }
          </div>
          </Link>
          <div className="flex flex-col">
            <div className=" flex gap-2">
              <h2 className="font-semibold text-sm text-black">{`${data.author.UserName.slice(0,10)}...`}</h2>
            {data.author._id!=user._id? <div>
              {!isFollowing?
              <button onClick={followingHandler} className="font-semibold text-[#0846fe]">Follow</button>:
              <button disabled className="font-semibold text-[#0846fe]">Following</button>
              }
             </div>:""}
            </div>
           <h1 className="text-xs font-medium text-slate-600 italic">Original music</h1>
          </div>
        </div>
        {data.author._id==user._id && self?
      <div className='relative w-14 flex justify-end'>
      <BsThreeDotsVertical onClick={postDeleteOpenHandler}/>
      <div id={"reelDelete"+index} className='w-0 absolute top-4'>
        <ul>
          <li><button onClick={ReelDeleteHandler} >Delete</button></li>
        </ul>
      </div>
      </div>:""
      }
      </div>
      {/* video show here */}
      <div onClick={postDeletecloseHandler} className="relative w-full h-[70%]">
        <video ref={videoRef} onClick={videoplay} id="video" src={data.secure_url} className="video w-full "></video>
        <div className='absolute p-2 bg-slate-700 rounded-full text-white right-4 bottom-6'>
          {true?<MdVolumeUp/>:<MdVolumeOff/>}
        </div>
      </div>
      {/* sharing thoghts section */}
      <div className="flex flex-col px-3">
      <div className="space-y-2">
      <div className="flex gap-4 text-3xl px-3">
         <div className="cursor-pointer">
         {isLiked?
          <FcLike onClick={reelDisLikeHandler}/>:
          <FaRegHeart onClick={reelLikeHandler}/>
         }
      </div>
          <FaRegComment onClick={(event)=>{
        event.preventDefault()
        navigate(`/comment_/${data._id}`,{state:{post_id:data._id,user:{UserName:user.UserName,avatar:user.avatar,_id:user._id},type:"Reel"}})
       }
        }/>
          <WebShare data={data.secure_url}/>
        </div>
      <h1>{`${data.Comments.length} Comments`}</h1>
      </div>
        <div className="inline text-sm">
        <h4>{data.tittle}</h4>
        <h4>{isLiked?`${data.likes.length+1} likes`:`${data.likes.length} likes`}</h4>
        <h4>{dayAndMonth}</h4>
        </div>
      </div>
    </div>
  );
}
