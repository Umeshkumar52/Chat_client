import React from 'react'
import Spinner from './Spinner';
import {ReactPlayer} from 'react-player/lazy'
export default function MediaComponent({url,url_type}) {  
  return (
    <div className='relative bg-black'>
       {/* <div> */}
        {(url_type=="jpg" ||url_type=="png")?
        <img src={url} className="w-[250px] min-h-[300px]  max-h-[350px]rounded-md"/>:
         <video src={url} className="w-[250px] min-h-[300px] max-h-[350px] rounded-md"  controls autoSave="true"/>
        }
    {/* </div> */}
     {/* {(uploading)?<Spinner/>:""} */}
        </div>
  )
}
