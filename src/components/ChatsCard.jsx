import React from 'react'
import moment from 'moment-timezone'
import MediaComponent from './MediaComponent'
import timer from '../helper/Timer';
export default function ChatsCard({data,sender,index,postDeleteOpenHandler}) {
    let timeFormate;
    if(data.createdAt){
    timeFormate=timer()
    // moment(data.createdAt).tz('/America/New_York').format('hh:mm:A') 
    }
    function postDelete(){
      postDeleteOpenHandler(data)
    }    
  return (
    <div onAuxClick={postDelete} className={(data.sender_id===sender)?"outgoing":"incoming"} key={index}>                
    <div className='md:max-w-[50vw]' id={`${(data.sender_id===sender)?"outgoingInner":"incomingInner"}`}>
        {(data.msg_type==="text")?
        <div className="pr-2 pb-6 text-3xl min-w-24 pl-3">{data.message}</div>:
        <MediaComponent key={index} data={data}/>
          }
        <h6 className="absolute bottom-0 right-2 text-[#cdcaca] flex items-end text-lg">
         {timeFormate?timeFormate:data.time}
        </h6>               
    </div>
  </div>
  )
}
