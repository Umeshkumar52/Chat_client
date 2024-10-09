export default function videoPlayerHandler(type){
    const videos=document.querySelectorAll(type)
     function callback(entries,observe){
       entries.map((entry)=>{
         if(entry.target.id=="video"){    
          if(entry.isIntersecting){     
              entry.target.play().catch(Error=>{
               return             
              })
           }else{
             entry.target.pause()
          }
           }}
          )
       }
     const option={
         root:null,
         rootMargin:'20px',
         threshold:.1
     }
     const observer= new IntersectionObserver(callback,option) 
    
     videos.forEach((vid)=>{
       observer.observe(vid)
     })
}