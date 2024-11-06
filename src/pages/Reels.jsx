import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowBack} from 'react-icons/io'
import { useNavigate} from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { allReels} from '../reducers/reelsReducer'
import ReelsCard from '../components/ReelsCard'
export default function Reels() {
  const dispatch=useDispatch()
  const[reels,setReels]=useState([])
 async function ReelsHandler(){
  const response=await dispatch(allReels())
  if(response.payload){
   setReels((reels)=>[...reels,...response.payload.data.message])}
  }
  useEffect(()=>{
    ReelsHandler()
  },[]) 
const containerRef=useRef(null);
  useEffect(() => {
    let isScrolling=false;
    const container=containerRef.current
    let lastScrollTop=0
    const handleScroll=()=> {
      const scrollTop =container.scrollTop;
      const videoHeight=container.clientHeight;
      if(!isScrolling){
        isScrolling=true
     const scrollDirection=scrollTop>lastScrollTop?'down':'up'
     lastScrollTop=scrollTop
     if(scrollDirection==='down'){
      container.scrollTo({
        top:Math.ceil(scrollTop/videoHeight)*videoHeight,
        behavior:"smooth"
      })
     }else{
       container.scrollTo({
        top:Math.floor(scrollTop/videoHeight)*videoHeight,
        behavior:"smooth"
      })
     }
     setTimeout(()=>{
      isScrolling=false
     },500)
    }}
    if(container){
    container.addEventListener("scroll",handleScroll)
    }
    return () => {
      if(container){
      container.removeEventListener("scroll", handleScroll);
      }
    };
  },[])
  // useEffect(() => {
  //   const videoElement = videoreference.current[currentVideo];    
  //   if (videoElement) {
  //     console.log(videoElement.offsetTop);
      
  //       containerRef.current.scrollTo({
  //       top:videoElement.offsetTop,
  //       behavior:"auto",
  //     });
  //   }
  // }, [currentVideo]); 
  return (
    <div id='reelWraper' ref={containerRef} className='hiddenScrollBar w-full h-[100vh] overflow-y-scroll'>
      {/* <div className='fixed top-1 left-3 text-[#4d4d4d] flex gap-1 items-center'> 
        <IoIosArrowBack onClick={()=>navigate(-1)} className='text-2xl cursor-pointer'/>
          <h1 className='font-semibold text-xl'>Reels</h1>
          </div> */}
          {reels?reels.map((Element,index)=>{
           return <ReelsCard key={index} index={index} data={Element}/>
          })
            :""
          }
    </div>
  )
}
