import React, { useEffect, useState } from 'react'
import ReelsCard from '../components/ReelsCard'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { allReels } from '../reducers/reelsReducer'
export default function Reels() {
  const[reels,setReels]=useState([])
  const navigate=useNavigate()
  const dispatch=useDispatch()
 async function ReelsHandler(){
  const response=await dispatch(allReels())
  if(response.payload.data){
   setReels((reels)=>[...reels,...response.payload.data.message])}
  }
  useEffect(()=>{
    ReelsHandler()
  },[])  
  return (
    <div className='reels space-y-8 pt-6 px-2 w-full h-screen overflow-y-scroll'>
      <div className='fixed top-1 left-3 text-[#4d4d4d] flex gap-1 items-center'> 
        <IoIosArrowBack onClick={()=>navigate(-1)} className='text-2xl cursor-pointer'/>
          <h1 className='font-semibold text-xl'>Reels</h1>
          </div>
          {reels?reels.map((Element)=>{
            return <ReelsCard key={Element._id} data={Element}/>
          })
            :""
          }
    </div>
  )
}
