export default function useWatchTimeHandler(type) {
    const videos = document.querySelectorAll(type);
    let viewStart=null;
    let totalWatchingTime=0;
    function callback(entries) {
      entries.map((entry) => {        
        // if (entry.target.id == "video") {          
          if (entry.isIntersecting) {
            console.log("enter");
             viewStart=Date.now()
            }else if(viewStart){
            console.log(viewStart);
            const viewDuration=Date.now-viewStart
           totalWatchingTime+=viewDuration
           viewStart=null
           console.log(totalWatchingTime)
          }}        
      );
    }
 
    const observer = new IntersectionObserver(callback,{threshold:0.7});
    videos.forEach((post) => {
      observer.observe(post);
    });
  }
  