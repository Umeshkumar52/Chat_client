import { useEffect } from "react";
export default function useWindowResize(callback){
useEffect(()=>{
   const handleResize=()=>{
    if(typeof callback=='function'){
        callback(window.innerWidth)
    }

   }
   window.addEventListener('resize',handleResize)
   return ()=>window.addEventListener('resize',handleResize)
},[callback])
}