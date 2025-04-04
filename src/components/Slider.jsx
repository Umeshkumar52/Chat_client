import React from 'react'
import { BiMoviePlay, BiSolidBookOpen } from 'react-icons/bi'
import {TbEdit} from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
export default function Slider() {
  const navigate=useNavigate()
  return (
    <div className='w-[8rem] py-2 pl-4 text-lg rounded-lg  absolute bg-slate-100 top-10 right-4'>
      <div onClick={()=>navigate('/createPost')} className='flex cursor-pointer items-center hover:bg-slate-200 gap-3 py-1'>
        <TbEdit/>
        <h1>post</h1>
      </div>
      <div onClick={()=>navigate('/createStory')} className='flex cursor-pointer items-center hover:bg-slate-200 gap-3 py-1'>
        <BiMoviePlay/>
        <h1>Story</h1>
      </div>
      <div onClick={()=>navigate('/createReel')} className='flex cursor-pointer items-center hover:bg-slate-200 gap-3 py-1'>
        <BiSolidBookOpen/>
        <h1>Reel</h1>
      </div>
    </div>
  )
}
