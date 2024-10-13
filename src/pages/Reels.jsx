import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowBack} from 'react-icons/io'
import { useNavigate} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { allReels} from '../reducers/reelsReducer'
import ReelsCard from '../components/ReelsCard'
export default function Reels() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const[reels,setReels]=useState([])
 async function ReelsHandler(){
  const response=await dispatch(allReels())
  if(response.payload){
   setReels((reels)=>[...reels,...response.payload.data.message])}
  }
  useEffect(()=>{
    ReelsHandler()
  },[]) 
  return (
    <div id='reelWraper' className='hiddenScrollBar space-y-8 pt-6 w-full h-screen overflow-y-scroll'>
      <div className='fixed top-1 left-3 text-[#4d4d4d] flex gap-1 items-center'> 
        <IoIosArrowBack onClick={()=>navigate(-1)} className='text-2xl cursor-pointer'/>
          <h1 className='font-semibold text-xl'>Reels</h1>
          </div>
          {reels?reels.map((Element,index)=>{
           return <ReelsCard key={index} index={index} data={Element}/>
          })
            :""
          }
    </div>
  )
}
