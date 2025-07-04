export default function videoPlayerHandler(type, isplaying) {
  const videos = document.querySelectorAll(type);
  function callback(entries){
    entries.map((entry) =>{
      if (entry.target.id == "video") {
        if (entry.isIntersecting && isplaying) {
            entry.target.play().catch((Error) => {
            return;
          });
        } else {
          entry.target.pause(); 
        }
      }
    });
  }
  const option = {
    root: null,
    rootMargin: "20px",
    threshold: 0.8,
  };
  const observer = new IntersectionObserver(callback, option);
  videos.forEach((post) => {
    observer.observe(post);
  });
}
