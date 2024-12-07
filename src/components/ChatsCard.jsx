import React from 'react'
import moment from 'moment-timezone'
import MediaComponent from './MediaComponent'
export default function ChatsCard({data,sender,index,postDeleteOpenHandler}) {
    let timeFormate;
    if(data.createdAt){
    timeFormate=moment(data.createdAt).tz('/America/New_York').format('hh:mm:A') 
    }
    function postDelete(){
      postDeleteOpenHandler(data)
    }    
  return (
    <div onAuxClick={postDelete} className={(data.sender_id===sender)?"outgoing":"incoming"} key={index}>                
    <div className={(data.sender_id===sender)?"outgoingInner":"incomingInner"}>
        {(data.msg_type==="text")?
        <div className="pr-2 pb-3 min-w-24 pl-3">{data.message}</div>:
        <MediaComponent key={index} data={data}/>
          }
        <h6 className="absolute bottom-0 right-2 text-[#cdcaca] flex items-end text-xs">
         {timeFormate}
        </h6>               
    </div>
  </div>
  )
}
