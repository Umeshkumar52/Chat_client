import React from 'react'
import { FiSend } from 'react-icons/fi'
import {MdCancel} from 'react-icons/md'
export default function ChatMessageMedia({file,inputResetHandler,sendChat}) {
  return (
    <div className='w-full top-0 bg-black h-screen absolute'>
      <MdCancel onClick={()=>inputResetHandler(null)} className='text-3xl '/>
      {(file.file_type=="image/jpg" ||file.file_type=="image/png")?
        <img src={file.url} className='h-full w-full'/>:
         <video src={file.url} className='h-full w-full' autoPlay autoSave="true"/>
        }      
        <form onSubmit={sendChat} className='fixed bottom-4 right-4 w-full flex justify-end'>  
          <div className="h-10 w-10 flex justify-center items-center rounded-full bg-[#2eff35] text to-black">
          <button type="submit"><FiSend className="h-6 w-6 text-black font-semibold"/></button>
          </div>
          </form> 
    </div>
  )
}
