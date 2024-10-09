import React from 'react'
import Spinner from './Spinner';
import {ReactPlayer} from 'react-player/lazy'
export default function MediaComponent({url,url_type}) {  
  return (
    <div className='relative size-[230px]'>
       {/* <div> */}
        {(url_type=="jpg" ||url_type=="png")?
        <img src={url} className="w-full h-full rounded-md"/>:
       
         <video src={url} className="w-full h-full rounded-md"  controls autoSave="true"/>
        }
    {/* </div> */}
     {/* {(uploading)?<Spinner/>:""} */}
        </div>
  )
}
