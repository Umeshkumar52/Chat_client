import React from 'react'

export default function FriendsSkelenton() {
  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow animate-pulse my-4">
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <div className="w-14 h-14 bg-gray-300 rounded-full"></div>

        {/* User Info */}
        <div className="flex-1">
          <div className="h-3 w-3/4 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
        </div>
      </div>
       {/* Buttons */}
       <div className="flex mt-4 space-x-2">
        <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
        <div className="h-8 w-1/2 bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}
