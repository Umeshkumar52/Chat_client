import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function MessagerUSerList({setSelectedUser }) {
 const[userList,setUserList]=useState(JSON.parse(localStorage.getItem("messager_user")) ||[])
 const navigate=useNavigate()
 function userSelection(data){
   if(window.innerWidth>766){
    setSelectedUser(data)
   }else{
     navigate(`/direct/${data.UserName}`,{state:data})
   }
 } 
  return (
   <>
   {userList.map(Element=>{    
    return  <div 
    key={Element._id}
    onClick={()=>userSelection(Element)}
    className="has-[:checked]:bg-indigo-300/40 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-400 py-2 hover:bg-slate-900"
  >
    <label className="w-full px-2 flex items-center gap-6 ">
        <img className="w-14 h-14 border-2 rounded-full" src={Element.avatar} />
      <div className="w-[75%] flex flex-col gap-2">
        <h1 className="text-white text-xl font-semibold">
          {Element.UserName ? Element.UserName.slice(0, 12) : ""}
        </h1>
        <h1 className="text-slate-300 text-sm font-semibold">
          {Element?.Name.slice(0, 12)}
        </h1>
        <input
          type="radio"
          name="ChatUser"
          className="hidden checked:border-indigo-600"
        />
      </div>
    </label>
  </div>
   })
   }
   </>
  );
}
