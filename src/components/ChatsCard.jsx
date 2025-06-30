import React, { memo} from 'react'
import MediaComponent from './MediaComponent'
import timer from '../helper/Timer';
import {HiOutlinePhoneMissedCall} from 'react-icons/hi'
import {MdOutlineMissedVideoCall} from 'react-icons/md'
 const ChatsCard=memo(({data,sender,index,selectedId,selctingMode,handleLongPress})=>{
    let timeFormate;
    if(data.createdAt){
    timeFormate=timer()
    }
  return (
    <div 
    onClick={(event)=>{
      event.preventDefault()
      if(selctingMode){
        handleLongPress(
          data.msg_type=="file"?{
            msg_type:data.msg_type,
            _id:data._id,
            public_id:data.public_id
          }:{
          msg_type:data.msg_type,
          _id:data._id
        }
      )}
      }
    }
    onContextMenu={(event)=>{
      event.preventDefault()
      handleLongPress(
        data.msg_type=="file"?{
          msg_type:data.msg_type,
          _id:data._id,
          public_id:data.public_id
        }:{
        msg_type:data.msg_type,
        _id:data._id
      }
        )}
      } 
     
     className={`${(data.sender_id===sender)?"outgoing":"incoming" } ${selectedId?.some(items=>items._id==data._id)&&"bg-green-500/25"}`} key={index}>                

    <div className='md:max-w-[50vw]' id={`${(data.sender_id===sender)?"outgoingInner":"incomingInner"}`}>
        {
        (data.msg_type==="text")?
        <h3 className="pr-2 pb-4 text-xl md:text-2xl min-w-24 pl-3">{data.message}</h3>:
        (data.msg_type==="file")?<MediaComponent key={data._id} data={data}/>:
        (data.msg_type==="call")&&
        <div className='flex items-center pr-14 pb-3 px-3 pt-1 gap-1'>
          <div className='text-2xl rounded-full p-3 text-slate-400 bg-slate-800/20'>{data.message=="Voice Call"?<HiOutlinePhoneMissedCall/>:<MdOutlineMissedVideoCall/>}</div>
         <div>
         <h2 className='text-lg '>{data.message}</h2>
         <h5 className='text-base text-slate-400/90'>{"No answer"}</h5>
         </div>
        </div>
 }
        <h6 className="absolute bottom-0 right-2 text-[#cdcaca] flex items-end text-sm">
         {timeFormate?timeFormate:data.time}
        </h6>               
    </div>
  </div>

  )
})
export default ChatsCard
