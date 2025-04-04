export default function videoPlayerHandler(type, isplaying) {
  const videos = document.querySelectorAll(type);
  function callback(entries, observe) {
    entries.map((entry) => {
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
    threshold: 0.1,
  };
  const observer = new IntersectionObserver(callback, option);
  videos.forEach((vid) => {
    observer.observe(vid);
  });
}
