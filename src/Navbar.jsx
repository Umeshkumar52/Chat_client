import React from 'react'

export default function Navbar() {
  return (
    <div>
       <div className="fixed w-full h-10 bg-black top-0">
        <div className=" flex flex-row gap-2 items-center">
          <div className="flex gap-3">
            <img
              src={avatar}
              className="w-8 cursor-pointer h-8 rounded-full border-dotted border-1"
            />
            <div className="flex flex-col gap-0 p-0">
              <h1 key={currentUser} className="user text-base font-medium text-white">{currentUser}</h1>
              <h1 className="text-xs">{isTyping ? "typing..." : ""}</h1>
            </div>
            <a
              className="text-yellow-400 cursor-pointer fixed right-4 font-serif text-sm"
              onClick={() => {
                setGoin(true);
              }}
            >
              Goin Group
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
