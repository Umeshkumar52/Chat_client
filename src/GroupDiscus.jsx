import React, { useEffect } from 'react'
import avater from './avatar.png'
import { useState } from 'react'
export default function GroupDiscus({socket}) {
    const input=document.getElementById("input")
    const[isTyping,setIsTyping]=useState(false)
    const [joinGroup,setJoinGroup]=useState(false)
    const form=document.getElementById("form")
    const msg_container=document.querySelector('.msg_container')
    const[list,setMessageList]=useState([])
     const [message,setMessage]=useState('')
     const[goinGroup,setGoin]=useState(false)
     let user=localStorage.getItem("userName")
     function joinRoom(){
      socket.emit("join_room",'meeting')
    }
      function chatmsgHandler(event){
        setIsTyping(true)
        setMessage(event.target.value)
      }
      function closeGroupChat(value){
        setJoinGroup(value)

      }
      console.log(list);
      function appendmsg(data,type){
        const list=document.createElement('div')  
        let className=type
        list.classList.add(className)
        let markup=`
        <h4>${data.message}</h4>
        <h6>${data.time}</h6>
        `
        list.innerHTML=markup
        msg_container.appendChild(list)
    }
     async function sendChat(event){
        event.preventDefault()
        const hours=new Date(Date.now()).getHours()
        let realHours;
        let newFormat;
        if(hours>12){
          realHours=hours-12
        }else
        if(hours<12){
          realHours=hours
        }else
        if(hours==12){
          realHours=12
        }
        if(hours>=12){
          newFormat="PM"
        }else{
          newFormat="AM"
        }
        const data={
          message:message,
          time:realHours+":"+ new Date(Date.now()).getMinutes() +" "+ newFormat,
          userName:user
        }

       await socket.emit("group_chat_uotgoing",data)
       appendmsg(data,'outgoing')
       setMessage("")
      }
   useEffect(()=>{
    socket.on("group_chat_incoming",(data)=>{
      setMessageList((list)=>[...list,data])
     list.scrollTop=list.scrollHeight;
   });
   },[])
  return (
    <div className='w-full relative h-full text-white'>
    <div className='w-full flex justify-center pt-2'>
      <h1 className='rounded-tr-lg rounded-bl-lg bg-indigo-600 px-5 py-1 text-white font-bold text-2xl font-serif'>Group Discusion</h1>
      <div className='absolute flex px-10  w-full justify-center lg:justify-end items-center'>
     </div> 
    </div>
    
 <div className='msg_container overflow-y-auto flex flex-col gap-8 py-10 pt-[2rem]'>
   {
    list.map((msg,index)=>{
    
      return (
       <div className='incMsgCover flex ml-2'>
         <div className='h-5 w-5'>
          <img src={avater}/>
          </div>
        <div className='relative ' key={index}>
         <div className='incoming w-full flex flex-col py-2 rounded px-1 bg-[#3f3f3f]'>
         <h1 className='text-yellow-500 text-xs'>User Name</h1>
          <h4 className='pt-0'>{msg.data.message}</h4>
          <h6 className='flex items-end text-xs'>{msg.data.time}</h6>
        </div>
        </div>
        </div>
      )
    })
   }
 </div>
   <form className='fixed w-full bottom-0' onSubmit={sendChat} id='form' >
       <div className="border-2 ">
       <input id='input' type='text'  onChange={(e)=>{chatmsgHandler(e)}} value={message} name='input' className=' w-full border-none p-1 text-black font-semibold' placeholder='Messagee'/><button type='submit' id='button' className=' p-2 absolute w-32 right-0 bg-yellow-400 hover:bg-yellow-600 text-white font-semibold'>Send</button>
      </div>
   </form>
  </div>
  )
}

