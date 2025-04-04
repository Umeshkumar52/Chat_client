import React from 'react'

export default function ProfileSkelenton() {
  return (
    <div className="w-full h-[100vh] max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 animate-pulse">
      {/* Cover Photo */}
      <div className="w-full h-40 bg-gray-300 rounded-lg mb-6"></div>

      {/* Profile Picture */}
      <div className="w-24 h-24 bg-gray-300 rounded-full -mt-14 border-4 border-white mx-auto mb-4"></div>

      {/* Name */}
      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
      {/* Username or status */}
      <div className="h-3 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
      {/* About/Bio */}
      <div className="space-y-2 mt-4">
        <div className="h-3 bg-gray-300 rounded w-full"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
        <div className="h-3 bg-gray-300 rounded w-2/3"></div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <div className="h-10 w-28 bg-gray-300 rounded"></div>
        <div className="h-10 w-28 bg-gray-300 rounded"></div>
      </div>
    </div>

  )
}
