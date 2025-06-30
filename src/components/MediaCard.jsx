import React, {useEffect, useRef, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import {AiFillLike, AiOutlineComment} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { following} from '../reducers/authReducer'
import socket from '../socket'
import { deletPost, likePost, removeLike} from '../reducers/socialPostController'
import {BiSolidLike} from 'react-icons/bi'
import WebShare from '../helper/WebShare'
import videoPlayerHandler from '../helper/videoPlayerHandler'
import {BsThreeDotsVertical} from 'react-icons/bs'
import PlayPause from './PlayPause'
import handleDownload from '../hooks/useDownload'
 const MediaCard= React.memo(({data,updateDeletPostHandler,self})=> {  
  const dateOption={
    day:"2-digit",
    month:"short"
  }  
  let time=new Date(data.createdAt);
  const dayAndMonth=time.toLocaleDateString(time,dateOption);
  const user=useSelector((state)=>{return state.auth.user});
  const navigate=useNavigate();
  const[isLiked,setIsLiked]=useState(false)
  const[deletButtonState,setDeleteButtonState]=useState(false)
  const[isFollowing,setIsFollowing]=useState(false)
  const[playButtonShowing,setPlayButtonShowing]=useState(false)
  const[isPlaying,setIsPlaying]=useState(true)
  const[descriptionSlice,setDescriptionSlice]=useState(data?.description.length>50?true:false)
  const[readless,setReadless]=useState(false)
  const dispatch=useDispatch()
  const videoRef=useRef(null) 
   const{onlineUser}=useSelector(state=>state.globalyCall) 
  function videoplay(event) {
    event.preventDefault();
    if (isPlaying) {
      videoRef.current.pause();
      setPlayButtonShowing(true)
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {
        return;
      });
      setPlayButtonShowing(true)
      setIsPlaying(true);
    }
    setTimeout(()=>{
      setPlayButtonShowing(false)
    },700)
  }
   async function followingHandler() {
    setIsFollowing(true)
     socket.emit("following",{requester:user._id,reciever:data.author._id})
     await dispatch(following({requester:user._id,reciever:data.author._id}))     
   }   
   async function postLiketHandler(){
    setIsLiked(true)
     await dispatch(likePost({post_id:data._id,author:user._id}))      
  }  
  async function remove_like(event){
    setIsLiked(false)
    await dispatch(removeLike({post_id:data._id,author:user._id}))
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
    videoPlayerHandler("video",isPlaying)    
  //   if(data.author.Followers){
  //  data.author.Followers.map((Element)=>{  
  //    if(Element ==user._id){
  //     setIsFollowing(true)
  //    }
  //  })}   
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
     socket.on("unfollowing",(following)=>{
      if(data.author._id==following.reciever){
        setIsFollowing(false)
        }
     })
   },[socket])
  return (
 <div data-id={data._id} className='cover post w-full bg-white rounded-md relative shadow-lg py-4 flex flex-col gap-4'>
  <div className='w-full flex flex-col gap-1 px-2'>
  <div className='w-full relative flex gap-2 items-center'>
   <div onClick={()=>navigate(`/${data?.author.UserName}`)} className='relative cursor-pointer flex'>
  {data.author?.avatar?
  <img className='size-14 rounded-full border-2' src={data?.author?.avatar}/>:
   <CgProfile className='w-full h-full text-4xl'/>
   }
  {onlineUser?.includes(data.author.UserName)&&
   <svg className='absolute size-4 bg-green-400 rounded-full bottom-0 right-0'/>
  }
   </div>
    <div className=' px-2 flex justify-between'>
     <div className='flex gap-2'>
     <div>
       <h2 className='font-semibold text-lg text-black'>{`${data?.author?.UserName.slice(0,10)}`}</h2>
       <h1 className='text-sm'>{dayAndMonth}</h1>
     </div>
     {/* test user is self or not */}
     {data.author._id!=user._id?
     <div>
      { data.author.Followers.includes(user._id) ||isFollowing?
     <h1  className='font-semibold  cursor-pointer text-[#0846fe]'>Following</h1>:
     <h1  onClick={()=>followingHandler(data.author._id)} className='font-semibold cursor-pointer text-[#0846fe]'>Follow</h1>
      }
      </div>:
      ""}
      </div>
    </div>
  </div>
  {/* description */}
  <div className='w-full px-1'>
    <h4 className='text-lg'>{`${descriptionSlice?data.description.slice(0,50)+"...":data.description}`} <span onClick={()=>{
      setDescriptionSlice(prev=>!prev)
      setReadless(prev=>!prev)
      }} className='text-indigo-700 cursor-pointer'>{descriptionSlice&&"read more"} {readless?"read less":""}</span></h4>
  </div> 
  </div>
  {/* video show here */}
  {data.url_type=="mp4"?
   <div className='relative flex justify-center w-full'>
    <video className='w-full min-h-[50vh] bg-black max-h-[90vh]' controls={true} onDoubleClick={()=>navigate(`/post/${data._id}`)} onClick={videoplay} id='video' src={data.url} ref={videoRef} />
         {playButtonShowing &&<PlayPause isPlaying={isPlaying}/>}
   </div>:
   <>
    <img id='img' className='w-full min-h-[50vh] max-h-[70vh]' onDoubleClick={()=>navigate(`/post/${data._id}`)} src={data.url} />
 </>
 }

<div className='absolute text-black text-xl top-6 right-4 w-14  flex justify-end'>
      <BsThreeDotsVertical onClick={()=>setDeleteButtonState(!deletButtonState)}/>
      {deletButtonState?
      <div id={"postDelete"+data._id} className='absolute text-base bg-slate-100 p-2 rounded-lg -top-2 right-6'>
       <button onClick={()=>{
        handleDownload(data.url)
        setDeleteButtonState(!deletButtonState)
       }}>download</button>
        {data.author._id==user._id && self&&
      <button onClick={postDeleteHandler}>Delete</button> }    
   </div>:""
     }
      </div>

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
       {/* https://chat-client-cgiv.onrender.com/post/ */}
       <WebShare data={`https://chat-client-cgiv.onrender.com/post/${data._id}`} type="post"/>       
      </div>
   </div>
</div>
  )
})
export default MediaCard
