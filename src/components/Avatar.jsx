import React from 'react'

export default function Avatar(img) {
  return (
    <>
      <img src={img} alt="profile img" className="w-full h-full border-black rounded-full border-2" />
    </>
  )
}
