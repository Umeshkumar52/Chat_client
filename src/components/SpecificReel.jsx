import React, { useEffect, useState } from 'react'
import { specificReels } from '../reducers/reelsReducer'
import ReelsCard from './ReelsCard'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export default function SpecificReel() {
    const{reel_id}=useParams()
    const[reel,setReel]=useState()
    const dispatch=useDispatch()
    async function reelHandler(){
        const response=await dispatch(specificReels(reel_id))
        if(response.payload){
            setReel(response.payload.data.message)
        }
    }
    useEffect(()=>{
        reelHandler()
    },[])
  return (
    <div>
      <ReelsCard data={reel}/>
    </div>
  )
}
