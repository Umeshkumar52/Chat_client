import React from 'react'

export default function ReelSkelenton() {
  return (
   
      <div className="w-full h-[100vh] bg-white rounded-lg overflow-hidden shadow-md animate-pulse my-4">
      {/* Video area */}
      <div className="w-full h-full bg-gray-300 relative">
        {/* Profile + text */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-400 rounded-full"></div>
          <div>
            <div className="h-3 w-32 bg-gray-400 rounded mb-1"></div>
            <div className="h-3 w-24 bg-gray-400 rounded"></div>
          </div>
        </div>
        <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-4">
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
