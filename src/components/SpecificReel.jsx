import React, { useEffect,useState } from 'react'
import { specificReels } from '../reducers/reelsReducer'
import { useDispatch } from "react-redux";
import {useParams } from "react-router-dom";
import ReelsCard from '../components/ReelsCard'
export default function SpecificReel() {
    const{reel_id}=useParams()
    const[post,setPost]=useState()
    const dispatch=useDispatch()
    async function reelHandler(){
        const response=await dispatch(specificReels(reel_id))
        console.log(response);
        
        if(response.payload){
            setPost(response.payload.data.message)
        }
    }
    useEffect(()=>{
        reelHandler()
    },[])
  return (
    <div className="vid relative flex flex-col gap-3">
       {
        post&&<ReelsCard data={post}/>
       }
       </div>  
  )
}
