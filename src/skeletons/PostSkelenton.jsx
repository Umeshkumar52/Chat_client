import React from 'react'

export default function PostSkelenton() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md animate-pulse my-4">
    {/* Header */}
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
      <div className="flex-1">
        <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>

    {/* Video Placeholder */}
    <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
     {/* Footer (like/comment/share etc.) */}
     <div>
        <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}