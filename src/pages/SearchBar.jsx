import React from 'react'
import UseDelay from '../helper/UseDelay';
import { MdCancel } from 'react-icons/md';
export default function SearchBar({updateSearchTerm,searching,setSearching}) {
  const debounceCallBack=UseDelay((event)=>updateSearchTerm(event.target.value))
  return (
    <div className='sticky top-2 flex gap-2 mx-2'>
     <input className=' w-full p-3 text-xl focus:outline-none ring-1 rounded-md ring-[#a976c9]' type='search' onChange={debounceCallBack} placeholder='Search User...'/>
     <MdCancel onClick={()=>setSearching(!searching)} className='text-red-600 text-4xl'/>
    </div>
  )
}
