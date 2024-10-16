import React from 'react'
export default function MessagerUSerList({Element,SelectedUser}){  
  return (
        <div onClick={()=>{SelectedUser(Element)}} className='has-[:checked]:bg-indigo-300/40 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-400 py-3 hover:bg-slate-900'>
        <label className='w-full flex gap-2'>
        <div className='w-[25%]'>
        <img className='w-14 h-14 rounded-full' src={Element.avatar}/>
        </div>
      <div className='w-[75%] flex'>
        <h1 className='text-white text-xl font-semibold'>{Element.UserName.slice(0,14)}</h1>
        <input type='radio' name='ChatUser' className='hidden checked:border-indigo-600'/>
        </div>
        </label>
        </div>
        )}
