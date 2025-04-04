import React from 'react'
import { PiShareFatLight } from 'react-icons/pi'
import {RWebShare} from 'react-web-share'
export default function WebShare({data,type}) {
  return (
    <div className="text-xl">
      <RWebShare data={{
        text:'web share post',url:data,tittle:"mp4"
      }}
      >
             <button> 
                <div className='flex gap-2 cursor-pointer items-center'>
        <PiShareFatLight/>
        {type?"Share":""}
        </div>
        </button>
        </RWebShare>
    </div>
  )
}
