import React from 'react'
import { FcSearch } from "react-icons/fc";
import UseDelay from '../helper/UseDelay';
export default function SearchBar({updateSearchTerm}) {
  const debounceCallBack=UseDelay((event)=>updateSearchTerm(event.target.value))
  return (
    <div className=' w-full flex pt-2 rounded-xl'>
     <input type='search' onChange={debounceCallBack} placeholder='Search...' className='rounded-xl px-2 py-4  w-full text-medium font-normal pl-2 h-6 border-2 border-[#adaea8] text-black bg-white'/>
     {/* <FcSearch className='relative right-14 cursor-pointer w-full h-10'/> */}
    </div>
  )
}
