import React from 'react'
import '../index.css';
import { CgAddR} from 'react-icons/cg'
import {GrSearch} from 'react-icons/gr'
import {BiSolidMessageRoundedDots} from "react-icons/bi"
import {useNavigate } from 'react-router-dom'
export default function NabigationBar({user,searching,setSearching,sliderOpen,setSliderOpen}){
  function sliderState(){
    if(sliderOpen){
      setSliderOpen(false)
    }else{
      setSliderOpen(true)
    }
  }
  const navigate=useNavigate() 
  return (
    <div className='relative flex min-h-[3.5rem] bg-white px-4 items-center justify-between border-b-2'>
      <h1 className='font-bold text-transparent bg-clip-text text-2xl bg-gradient-to-r from-[#0846fe] from-25% to-[#ff0505]'>Eangager</h1>
      <div className='flex items-center gap-8 text-2xl md:pr-10'>
        {/* Search bar handle */}
        <div onClick={()=>setSearching(!searching)} className={`relative min-w-[15vw] hidden md:${searching?"hidden":"block"}`} >
         <input value={""} type="text" placeholder='Search...' className='w-full px-2 pr-14 py-1 focus:outline-none border-2 border-slate-800' />
         <GrSearch className='absolute right-5 bottom-2' id='search'/>
       </div>
        <GrSearch onClick={()=>setSearching(!searching)} className='md:hidden block'/>
        <CgAddR className='lg:hidden block' onClick={sliderState}/>
        <ul className='hidden lg:block text-lg text-indigo-700 font-medium space-x-8 cursor-pointer gap-4'>
          <li onClick={()=>navigate('/createPost')} className='inline'>Post</li>
          <li onClick={()=>navigate('/createStory')} className='inline'>Story</li>
          <li onClick={()=>navigate('/createReel')} className='inline'>Reel</li>
        </ul>
        <BiSolidMessageRoundedDots className='block md:hidden' onClick={()=>navigate('/direct')}/>
      </div>
    </div>
  )
}
