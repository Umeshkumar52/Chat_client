import React from 'react'
import Spinner from './Spinner';
import {ReactPlayer} from 'react-player/lazy'
export default function MediaComponent({uploading,url,url_type}) {
  return (
    <div className='relative'>
       <div>
        {(url_type=="jpg" ||url_type=="png")?
        <img src={url} className="h-[240px] w-[200px] rounded-md"/>:
       
         <video src={url} className="h-[628px] w-[1200px] rounded-md"  controls autoSave="true"/>
        }
    </div>
     {(uploading)?<Spinner/>:""}
        </div>
  )
}
