import React from 'react'

export default function MediaComponent({data}) {   
  return (
    <div className='relative bg-black'>
        {(data.url_type=="jpg" ||data.url_type=="png")?
        <img src={data.secure_url} className="w-[250px] min-h-[300px]  max-h-[350px]rounded-md"/>:
         <video src={data.secure_url} id='chat_video' className="w-[250px] min-h-[300px] max-h-[350px] rounded-md" controls autoSave="true"/>
        }
        </div>
  )
}
