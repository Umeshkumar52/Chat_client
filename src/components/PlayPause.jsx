import React from 'react'
import { FaPause, FaPlay } from 'react-icons/fa6'

export default function PlayPause({isPlaying}) {
  return (
     <div className="absolute top-[40%] left-[40%] text-5xl lg:8xl  translate(-50%,-50%) p-3 rounded-lg shadow-lg text-white bg-slate-800/40 bg-opacity-60">
             {!isPlaying ? <FaPlay /> : <FaPause />}
    </div>
  )
}
