import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import NabigationBar from '../components/NavigationBar'
import Stories from '../components/Stories'
import MediaCard from '../components/MediaCard'
import { allSocialPost, allStories } from '../reducers/socialPostController'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosNotificationsOutline, IoMdAdd, IoMdHome } from 'react-icons/io'
import { PiNotePencilFill } from 'react-icons/pi'
import { BiMoviePlay, BiSolidBookOpen } from 'react-icons/bi'
import { FaUserGroup } from 'react-icons/fa6'
import PageLocRes from '../helper/PageLocRes'
import { CgProfile } from 'react-icons/cg'
import socket from '../socket'
import { unReadNotificationRed} from '../reducers/notificationReducer'
import PostedAlert from '../helper/PostedAlert'
export default function Home(){
   const windowScroller=document.querySelector('.hiddenScrollBar')
  // const {auth,socialPost}=useSelector((state)=>{return state})  
  const auth=useSelector((state)=>{return state.auth}) 
  const socialPost=useSelector((state)=>{return state.socialPost}) 
  const notification=useSelector((state)=>{return state.notification.unReadNotification})
 const[unReadNotification,setUnReadNotification]=useState(0)
  const[offset,setOffset]=useState(0)
  const[isLoading,setIsLoading]=useState(false)
    const[page,setPage]=useState(1)
    const[stories,setStories]=useState(socialPost.story || [])
    const navigate=useNavigate()  
    const[post,setPost]=useState(socialPost.post || [])
    const dispatch=useDispatch() 
    const location=useLocation()   
    const [postAlert,setPostAlert]=useState(false)  
  const limit=16
  function slideCloseHandler(){
    document.getElementById('postSlide').style.width="0rem"
  }
  let storyGroup={}
  function filterUserStories(stories){
    stories.forEach((Element,index)=>{
      if(!Element.author)return      
       if(!storyGroup[Element.author.UserName]){
         storyGroup[Element.author.UserName]={
           user:Element.author,
           story:[]
         }
        }
       storyGroup[Element.author.UserName].story.push(Element.secure_url)       
    })     
   
} 

  async function storyHandler(){
    const story=await dispatch(allStories())
    if(story.payload){
    setStories((stories)=>[...stories,...story.payload.data.message])   
  }
  // if(response.payload){
  //   setUnReadNotification(response.payload.data.message.unReadNotification)
  // }
    }
    async function postHandler(){
      setIsLoading(true)
      const response=await dispatch(allSocialPost({offset:offset,limit:limit}))
      if(response.payload){
        setIsLoading(false)
        setOffset((prevOffset)=>prevOffset+limit)
      setPost((post)=>[...post,...response.payload.data.message]) 
      }
    } 
    useEffect(()=>{
      if(stories.length===0){
        storyHandler()
      }
    },[auth.user])
  useEffect(()=>{
    if(isLoading===false && post.length===0 || isLoading===false && page>1 ){
      postHandler() 
    }   
  },[page]) 
  filterUserStories(stories)
function handleScroll(){  
  const scrollTop=window.pageYOffset || windowScroller.scrollTop;
  const scrollHeight=windowScroller.scrollHeight;
  const clientHeight=windowScroller.innerHeight || document.documentElement.clientHeight;
  if(scrollTop+clientHeight>=scrollHeight-1){
     setPage((prev)=>prev+1)
  }
}
useEffect(()=>{
   if(windowScroller){
    windowScroller.addEventListener("scroll",handleScroll)
   }
    return ()=>{
      if(windowScroller){
        windowScroller.removeEventListener("scroll",handleScroll)
      }
    }
},[isLoading])
useEffect(()=>{
   socket.on("newNotification",newNotification=>{
    setUnReadNotification((prevCounter=>[...prevCounter,prevCounter+1]))
   })
   socket.on("post",(data)=>{
    setPostAlert(true)
    setTimeout(()=>{
      setPostAlert(false)
    },700)
   })
},[socket])
PageLocRes("hiddenScrollBar")
  return (
     <div onScroll={slideCloseHandler} className='hiddenScrollBar relative w-full h-screen md:justify-items-center overflow-y-scroll pt-2 space-y-6 text-black'>
        {/* Nabigation Bar */}
        <div className='relative'>
     <NabigationBar user={auth.user}/>
     {/* Stories Pannel */}
     <div className='stories w-full space-x-4 px-3 py-2 border-b-2'>
     <div onClick={()=>navigate('/createStory')} className='storyMain'>
    <div className='relative'>
     <div className='w-[65px] h-[65px] rounded-full bg-gradient-to-r from-[#4141e8] to-[#f706e7] p-0.5'>
      <img src={auth.user.avatar} className='w-full h-full rounded-full bg-white'/>
     </div>
     <div className='absolute bg-blue-500 bottom-1 right-0 w-5 h-5 rounded-full'>
     <IoMdAdd className='text-xl text-white '/>
        </div>
       </div>
    <h1 className='text-sm text-black font-medium'>Your story</h1>
    </div> 
      {Object.values(storyGroup).length>0?
      Object.values(storyGroup).map((Element,index)=>{
        return <Stories key={index} data={Element}/>
      }):""
      }      
   </div>
   {/* post menu slide */}
   <div id='postSlide' className='w-[0px] absolute flex flex-col py-3 gap-2 rounded-lg top-8 right-2 bg-slate-200'>
         <div onClick={()=>navigate("/createPost",{state:auth.user})} className='flex gap-2 cursor-pointer px-3 pr-6 items-center border-b-2 border-black'>
          <PiNotePencilFill/>
            <h2>Post</h2>
         </div>
         <div onClick={()=>navigate("/createStory")} className='flex gap-2 px-3 pr-6 cursor-pointer items-center border-b-2 border-black'>
          <BiSolidBookOpen/>
            <h2>Story</h2>
         </div>
         <div onClick={()=>navigate('/createReel')} className='flex px-3 pr-6 cursor-pointer items-center gap-2 '>
          <BiMoviePlay/>
            <h2>Reel</h2>
         </div>
       </div>
   </div>
   {/* Posts */}
     <div className='flex md:w-[312px] lg:w-[312px] flex-col pb-12 gap-10'>
  {post.length>0?
   post.map((Element,index)=>{
     return <MediaCard key={index} index={index} data={Element}/>
  }):""
     }
     </div>
     {/* navigate */}
       <div className='w-full fixed bottom-0 flex bg-white justify-between py-1 px-3 items-center text-3xl'>
      <Link to='/'> <IoMdHome/></Link>
      <Link to='/reels'><BiMoviePlay/></Link>
       <Link to='friendRequest'><FaUserGroup/></Link>
       {/* <div className='relative p-1'>
       <Link to='notification' >
       <IoIosNotificationsOutline/>
       {unReadNotification>0?
       <div className='absolute flex justify-center items-center size-5 bg-red-700 text-justify text-sm font-semibold text-white rounded-full top-0 right-0'>{unReadNotification}</div>:""
      }
       </Link>
       </div> */}
     <Link to={`/${auth.user.UserName}`} className='w-8 h-8 rounded-full'>
     {auth.user.avatar?<img src={auth.user.avatar} className='w-full h-full border-black rounded-full border-2'/>:
       <CgProfile className='h-full w-full'/>
       }
     </Link>
      </div>
      {/* post Alert  */}
      {postAlert?
          <PostedAlert/>:""
      }
    </div>
  ) 
}
