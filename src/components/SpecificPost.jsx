import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { specificPost } from '../reducers/socialPostController'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import MediaCard from './MediaCard'
export default function SpecificPost() {
    const{post_id}=useParams()
    const[post,setPost]=useState()
    const dispatch=useDispatch()
    async function postHandler(){
        const response=await dispatch(specificPost(post_id))
        if(response.payload){
            setPost(response.payload.data.message)
        }
    }
    useEffect(()=>{
        postHandler()
    },[])
  return (
    <div className='pt-6'>
       {post?
       <MediaCard data={post} index={0}/>:
       ""}
    </div>
  )
}
