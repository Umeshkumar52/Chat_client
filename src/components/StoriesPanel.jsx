import React, {useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { allStories } from '../reducers/socialPostController';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import Stories from './Stories';
const StoriesPanel =()=> {
     const data=sessionStorage.getItem("stories") 
     const storeisExpire=parseInt(sessionStorage.getItem("storiesExpire"))
     let minetPassed=Math.floor((Date.now()-storeisExpire)/(1000*60)) 
      const [stories, setStories] = useState(JSON.parse(data) || []);
      let storyGroup = {};
      const dispatch=useDispatch()
      const navigate=useNavigate()
      const{user}=useSelector(state=>state?.auth)
      const filterUserStories=(stories)=> {
        stories.forEach((Element, index) => {
          if (!Element.author) return;
          if (!storyGroup[Element.author.UserName]) {
            storyGroup[Element.author.UserName] = {
              user: Element.author,
              story: [],
            };
          }
          storyGroup[Element.author.UserName].story.push(Element.secure_url);          
        });
      }
      async function storyHandler() {
        const story = await dispatch(allStories());
        if (story?.payload) {
          setStories((stories) => [...stories, ...story.payload.data.message]);
        }
      }
      // console.log(minetPassed.toString(), minetPassed.toString());
      
      useEffect(() => {
        //  if(minetPassed.toString()>=5 || minetPassed.toString()=="NaN"){
          storyHandler();
        //  }       
      }, []);
     useMemo(()=>{
      filterUserStories(stories)
     })           
  return (
     <div className="stories bg-white w-full space-x-4 py-1 px-3 border-b-2">
             <div onClick={() => navigate("/createStory")} className="storyMain">
               <div className="relative">
                 <div className="size-[63px] rounded-full bg-gradient-to-r from-[#4141e8] to-[#f706e7] p-0.5">
                   <img
                     src={user?.avatar}
                     className="w-full h-full rounded-full bg-white"
                   />
                 </div>
                 <div className="absolute bg-blue-500 bottom-1 right-0 w-5 h-5 rounded-full">
                   <IoMdAdd className="text-xl text-white " />
                 </div>
               </div>
               <h1 className="text-sm text-black font-medium">Your story</h1>
             </div>
             {Object.values(storyGroup).length > 0
               ? Object.values(storyGroup).map((Element, index) => {
                   return <Stories key={index} data={Element} />;
                 })
               : ""}
           </div>
  )
}
export default StoriesPanel
