import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allReels } from "../reducers/reelsReducer";
import ReelsCard from "../components/ReelsCard";
import ReelCardPulse from "../components/ReelCardPulse";
import ReelsLayouts from "./ReelsLayouts";
import ReelSkelenton from "../skeletons/ReelSkelenton";
export default function Reels() {
  const navigate=useNavigate()
  const [reels, setReels] = useState([]);
  const[page,setPage]=useState(0)
  const[offset,setOffset]=useState(0)
  const[isLoading,setIsLoading]=useState(false)
  const dispatch = useDispatch();
  async function ReelsHandler() {
    const limit=10;
    const response = await dispatch(allReels({offset:offset,limit:limit}));
    if (response.payload) {
      setOffset(prev=>prev+limit)
      setReels((reels) => [...reels, ...response.payload.data.message]);
      setIsLoading(false)
    }
  }
  useEffect(() => {
  ReelsHandler()
  }, [page]);
 const handleScroll=()=>{
  const windowScroller=document.querySelector("#reelContainer")
  const scrollTop = window.pageYOffset || windowScroller.scrollTop;
  const scrollHeight = windowScroller.scrollHeight;
  const clientHeight =windowScroller.innerHeight || document.documentElement.clientHeight;  
  if (scrollTop + clientHeight + 1 >= scrollHeight) {
  // if(!isLoading){
  //   setPage(prev=>prev+1)
  //   setIsLoading(true)
  // }  
 }
 }
  return (
    <ReelsLayouts>
    <div onScroll={handleScroll} id="reelContainer" className="hiddenScrollBar overflow-y-scroll h-[100vh] relative lg:w-[50%] md:w-[70%] w-full space-y-1 snap-y snap-mandatory">
      {reels.length>0?(
        reels.map((Element, index) => {
          return <ReelsCard key={index} index={index} data={Element} />;
        })
      ) : (
        <ReelSkelenton/>
      )}
      {isLoading&&<div className="text-3xl font-semibold text-center animate-pulse">Loading...</div>}
      <div className="block md:hidden fixed top-3 left-3">
        <div className="flex items-center gap-4 text-white">
        <IoMdArrowRoundBack onClick={()=>navigate(-1)} className="font-semibold text-center text-3xl inline cursor-pointer"/>
        <Link className="inline text-2xl font-normal">Reels</Link>
      </div>
      </div>
    </div>
  </ReelsLayouts> 
  );
}
