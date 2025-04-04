import React, {useEffect, useRef, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import {AiFillLike, AiOutlineComment} from 'react-icons/ai'
import {MdVolumeUp,MdVolumeOff} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { following } from '../reducers/authReducer'
import socket from '../socket'
import { deletPost, likePost, removeLike} from '../reducers/socialPostController'
import {BiSolidLike} from 'react-icons/bi'
import WebShare from '../helper/WebShare'
import videoPlayerHandler from '../helper/videoPlayerHandler'
import {BsThreeDotsVertical} from 'react-icons/bs'
import PlayPause from './PlayPause'
export default function MediaCard({data,updateDeletPostHandler,self,index}) {  
  const dateOption={
    day:"2-digit",
    month:"short"
  }  
  let time=new Date(data.createdAt)
  const dayAndMonth=time.toLocaleDateString(undefined,dateOption)
  const user=useSelector((state)=>{return state.auth.user})
  const navigate=useNavigate()
  const[isLiked,setIsLiked]=useState(false)
  const[deletButtonState,setDeleteButtonState]=useState(false)
  const[isFollowing,setIsFollowing]=useState(false)
  const[playButtonShowing,setPlayButtonShowing]=useState(false)
  const[isPlaying,setIsPlaying]=useState(true)
  const[muted,setMuted]=useState(false)
  const dispatch=useDispatch()
  const videoRef=useRef(null)  
  videoPlayerHandler("video",isPlaying)
  function videoplay(event) {
    event.preventDefault();
    if (isPlaying) {
      videoRef.current.pause();
      setPlayButtonShowing(true)
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch((Error) => {
        return;
      });
      setPlayButtonShowing(true)
      setIsPlaying(true);
    }
    setTimeout(()=>{
      setPlayButtonShowing(false)
    },700)
  }
   async function followingHandler(following_user) {
    if(following_user==data.author._id){
      setIsFollowing(true)
      }
     await dispatch(following({requester:user._id,reciever:data.author._id}))     
   }   
   async function postLiketHandler(event){
    setIsLiked(true)
     const response=await dispatch(likePost({post_id:data._id,author:user._id}))      
  }  
  async function remove_like(event){
    setIsLiked(false)
    const response=await dispatch(removeLike({post_id:data._id,author:user._id}))
  }
  async function postDeleteHandler() {
   const confirm= window.confirm("Are you sure you want to delete this post")
    if(confirm){
      const response=await dispatch(deletPost({post_id:data._id,public_id:data.public_id}))
      setDeleteButtonState(false)
    if(response?.payload){
    updateDeletPostHandler(data._id)
    }
    }else{
      setDeleteButtonState(false)
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
      // if(data.author._id==following.reciever){
      //   setIsFollowing(true)
      //   }
     })
   },[socket])  
         
  return (
 <div className='cover bg-white border-2 border-b-black relative py-4 flex flex-col gap-4'>
  <div className='flex flex-col gap-1 px-2'>
  <div className='w-full relative items-center flex gap-3'>
   <Link to={`/${data?.author.UserName}`}>
   <div className='cursor-pointer flex'>
  {data.author.avatar?
  <img className='size-12 rounded-full border-2' src={data?.author?.avatar}/>:
   <CgProfile className='w-full h-full text-4xl'/>
   }
   </div>
   </Link>
    <div className='w-full px-2 flex justify-between'>
     <div className='flex gap-2'>
     <div className=''>
       <h2 className='font-semibold text-lg text-black'>{`${data?.author?.UserName.slice(0,10)}`}</h2>
       {/* <h1 className='text-sm'>{data.updatedAt.split('T')[0]}</h1> */}
       <h1 className='text-sm'>{dayAndMonth}</h1>
     </div>
     {/* test user is self or not */}
     {data.author._id!=user._id?
     <div>
      {/* check user is following or not */}
      {(isFollowing)?
     <h1  className='font-semibold  cursor-pointer text-[#0846fe]'>Following</h1>:
     <h1  onClick={()=>followingHandler(data.author._id)} className='font-semibold cursor-pointer text-[#0846fe]'>Follow</h1>
      }
      </div>:
      ""}
      </div>
       {data.author._id==user._id && self&&
      <div className='relative w-14 text-2xl flex justify-end'>
      <BsThreeDotsVertical onClick={()=>setDeleteButtonState(!deletButtonState)}/>
     {deletButtonState?
      <div id={"postDelete"+index} className='absolute top-4'>
      <button onClick={postDeleteHandler}>Delete</button>      
   </div>:""
     }
      </div>
      }
    </div>
  </div>
  {/* description */}
  <div>
    <h4>{data.description}</h4>
  </div>
  </div>
  {/* video show here */}
  {data.url_type=="mp4"?
   <div className='relative w-full'>
    <video className='w-full max-h-[80vh]' onDoubleClick={()=>navigate(`/post/${data._id}`)} onClick={videoplay} id='video' muted={muted} src={data.url} ref={videoRef} />
    <div className='absolute text-2xl bg-slate-100 p-2 rounded-full bottom-4 right-6' onClick={()=>setMuted(!muted)}>
    {muted?<MdVolumeOff/>:<MdVolumeUp/>}
    </div>
    {/* play ANd pause  */}
         {playButtonShowing&&<PlayPause isPlaying={isPlaying}/>}
   </div>:
  //  className='relative flex items-center flex-col'
   <div >
    <img  className='w-full max-h-[70vh]' onDoubleClick={()=>navigate(`/post/${data._id}`)} src={data.url} />
   </div>}
   {/* sharing thoghts section */}
   <div className='flex flex-col gap-4'>
      <div className='flex justify-between px-2'>
        <div className='flex cursor-pointer gap-2'>
          <div className='rounded-full bg-[#0846fe] p-[2px] '>
          <AiFillLike className='bg-[#0846fe] rounded-full text-white'/>
          </div>
          <h4>{isLiked?data.likes.length+1:data.likes.length}</h4>
        </div>
        <div className='flex gap-2'>
          <h4>{`${data.Comments.length} comments`}</h4>
          <h4></h4>
        </div>
      </div>
      <div className='flex justify-between text-xl px-3'>
       <div className='flex gap-2 cursor-pointer items-center'>
      {!isLiked?
       <div>
       <BiSolidLike className='text-xl' onClick={()=>{
        postLiketHandler() 
      }}/></div>:
       <BiSolidLike onClick={()=>{
        remove_like()
       }} className='text-xl text-[#2d37ff]'/>
       }
       <h2>like</h2>
       </div>
       <div onClick={(event)=>{
        event.preventDefault()
        navigate(`/comment/${data._id}`,{state:{post_id:data._id,user:{UserName:user.UserName,avatar:user.avatar,_id:user._id,type:"Post"}}})
         }
        } className='flex gap-2 cursor-pointer items-center'>
       <AiOutlineComment/>
       <h2>comment</h2>
       </div>
       <WebShare data={`http://localhost:3000/post/${data._id}`} type="post"/>       
      </div>
   </div>
</div>
  )
}
