import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { post_Comments,updatePostInf } from '../reducers/socialPostController';
import { IoIosArrowBack } from 'react-icons/io';
import {FiSend} from 'react-icons/fi'
import {BsSendSlashFill} from'react-icons/bs'
import socket from '../socket'
import { commentReel } from '../reducers/reelsReducer';
export default function Comments() {
  const navigate=useNavigate()
    const{state}=useLocation()    
    const[comments,setComments]=useState([])
    const[addComment,setAddComment]=useState()
    const dispatch=useDispatch()
    async function postCommentHandler(event){
      event.preventDefault()
      setComments((data)=>[...data,{
        commit:addComment,
        author:{
          avatar:state.user.avatar,
          UserName:state.user.UserName
        }
      }])
      setAddComment("")
      if(state.type==="Reel"){
        const response=await dispatch(commentReel({post_id:state.post_id,inf:{author:state.user._id,commit:addComment}}))  
      }
       const response=await dispatch(updatePostInf({post_id:state.post_id,inf:{author:state.user._id,commit:addComment}}))      
    }
    useEffect(()=>{
        async function commit(){
        const response=await dispatch(post_Comments(state.post_id))
        setComments((comments)=>[...comments,...response.payload.data.message])
        }
        commit()
    },[state])  
    useEffect(()=>{
       socket.on("comment",(data)=>{
        console.log("socket",data);
       })
       socket.on("reelComment",(data)=>{
        console.log("socket",data);
       })
    },[socket])      
   return (
    <div className='w-full relative'>
     <div className='flex gap-1 py-2 items-center'>
      <IoIosArrowBack onClick={()=>navigate(-1)} className='text-2xl cursor-pointer'/>
     <p className='text-lg font-bold'>Comments</p>
     </div>
    <div className='hiddenScrollBar w-full h-[90vh] space-y-4 pb-10 overflow-y-scroll gap-3 p-4'>
     {(comments.length>0)?
     comments.map((Element,index)=>{
           return  <div key={index} className='flex gap-2'>
           <img src={Element.author.avatar} alt='img' className='w-10 h-10 rounded-full border-2 border-black'/>
           <div className='flex flex-col bg-slate-200 border-1 rounded-lg py-1 px-3'>
             <h2 className='text-black font-medium'>{Element.author.UserName}</h2>
             <p className='font-normal whitespace-pre-wrap'>{Element.commit}</p>
           </div>
         </div>
     }):<div className='w-full h-[90vh] flex justify-center items-center'>
      <p className='text-3xl font-semibold '>No Comments</p>
     </div>
      }
      </div>
      <div className='fixed bottom-1 w-full p-1'>
        <form onSubmit={postCommentHandler} className='flex gap-2' action="">
        <input type='text' autoFocus value={addComment} onChange={(event)=>{
          event.preventDefault()
          setAddComment(event.target.value)}} className='w-full rounded-lg text-black text-lg border-black p-1 border-2' placeholder='Add a comment...'/>
       {(addComment)?
        <div className="h-10 w-10 flex justify-center items-center rounded-full bg-[#2eff35] text to-black">
          <button type="submit"><FiSend className="h-6 w-6 text-black font-semibold"/></button>
          </div>:
         <div className="h-10  cursor-not-allowed w-10 flex justify-center items-center rounded-full bg-[#2eff35] text to-black">
         <BsSendSlashFill className=" h-6 w-6 text-black font-bold"/>      
         </div>
       }
        </form>
      </div>
    </div>
  )
}
