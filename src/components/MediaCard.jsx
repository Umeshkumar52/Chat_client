import React, { useEffect, useRef, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import {AiFillLike, AiOutlineComment} from 'react-icons/ai'
import {MdVolumeUp,MdVolumeOff} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { following } from '../reducers/authReducer'
import socket from '../socket'
import { likePost, updatePostInf } from '../reducers/socialPostController'
import {BiSolidLike} from 'react-icons/bi'
import WebShare from '../helper/WebShare'
export default function MediaCard({data}) {
  const user=useSelector((state)=>{return state.auth.user})
  const navigate=useNavigate()
  const[isLiked,setIsLiked]=useState(false)
  const[isFollowing,setIsFollowing]=useState(false)
  const[comments,setComments]=useState([])
  const[isPlaying,setIsPlaying]=useState(false)
  const[post_id,setPost_id]=useState()
  const dispatch=useDispatch()
  const videoRef=useRef(null)
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
   async function postLiketHandler(event){
    event.preventDefault()
     const response=await dispatch(likePost({post_id:data._id,author:user._id}))      
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
     socket.on("like",(data)=>{
      console.log(data);
      if(data.liked==user._id){
        setIsLiked(true)
      }
     })
   },[socket])
  return (
 <div className='relative flex flex-col gap-4'>
  <div className='flex flex-col gap-1 px-2'>
  <div className='flex gap-3'>
   <div onClick={()=>navigate('/profile',{state:data.author._id})} className='w-10 h-10 cursor-pointer border-2 border-[#d809ce] rounded-full flex'>
  {data.author.avatar?
  <img className='w-full h-full' src={data.author.avatar}/>:
   <CgProfile className='w-full h-full text-4xl'/>
   }
   </div>
    <div className='flex gap-2'>
     <div className=''>
       <h2 className='font-semibold text-sm text-black'>{data.author.UserName}</h2>
       <h1 className='text-sm'>{data.updatedAt.split('T')[0]}</h1>
     </div>
      {isFollowing?
     <h1  className='font-semibold  cursor-pointer text-[#0846fe]'>Following</h1>:
     <h1  onClick={followingHandler} className='font-semibold cursor-pointer text-[#0846fe]'>Follow</h1>
      }
    </div>
  </div>
  <div>
    <h4>{data.description}</h4>
  </div>
  </div>
  {/* video show here */}
  {data.url_type=="mp4"?
   <div className='relative h-[400px] flex flex-col'>
    <video src={data.url} ref={videoRef} loop controls preload='true' onClick={videoPlayingHandler} className='h-full w-full'></video>
    <div className='absolute cursor-pointer p-2 bg-slate-700 rounded-full text-white right-4 bottom-6'>
      {true?<MdVolumeUp/>:<MdVolumeOff/>}
    </div>
   </div>:
   <div className='relative h-[400px] flex flex-col'>
    <img src={data.url}  className='h-full'/>
   </div>
   }
   {/* sharing thoghts section */}
   <div className='flex flex-col gap-4'>
      <div className='flex justify-between px-2'>
        <div className='flex cursor-pointer gap-2'>
          <div className='rounded-full bg-[#0846fe] p-[2px] '>
          <AiFillLike className='bg-[#0846fe] rounded-full text-white'/>
          </div>
          <h4>{data.likes.length}</h4>
        </div>
        <div className='flex gap-2'>
          <h4>{`${data.Comments.length} comments`}</h4>
          <h4></h4>
        </div>
      </div>
      <div className='flex justify-between text-xl px-3'>
       <div className='flex gap-2 cursor-pointer items-center'>
      {!isLiked?
       <div onClick={postLiketHandler}>
       <BiSolidLike className='text-xl' onClick={()=>setIsLiked(true)}/></div> :
       <BiSolidLike className='text-xl text-[#2d37ff]'/>
       }
       <h2>like</h2>
       </div>
       <div onClick={(event)=>{
        event.preventDefault()
        navigate('/comments',{state:{post_id:data._id,user:{UserName:user.UserName,avatar:user.avatar,_id:user._id,type:"Post"}}})
       }
        } className='flex gap-2 cursor-pointer items-center'>
       <AiOutlineComment/>
       <h2>comment</h2>
       </div>
       <WebShare data={data.url} type="post"/>       
      </div>
   </div>
</div>
  )
}
