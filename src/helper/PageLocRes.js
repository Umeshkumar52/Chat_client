import { useEffect} from "react";
import { useLocation } from "react-router-dom";
const PageLocRes=(container_id)=>{    
    const location=useLocation()
    useEffect(()=>{
          const container=document.querySelector(`.${container_id}`)
        if(!container) return
          const savedScrollPosition=sessionStorage.getItem(location.key)
          if(savedScrollPosition){
            container.scrollTop=parseInt(savedScrollPosition,10)
          }
          const ScrollPosition=()=>{
            sessionStorage.setItem(location.key,container.scrollTop)
          }
          container.addEventListener('scroll',ScrollPosition)
          return ()=>{
            container.removeEventListener("scroll",ScrollPosition)
          }
      },[location,container_id])
}
export default PageLocRes