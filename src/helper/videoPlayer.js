export default function videoPlayer(isPlaying,setIsplaying,videoRef,setPlayButtonShowing){
  setPlayButtonShowing(true)
  if(isPlaying){
      videoRef.current.pause()
      setIsplaying(false)
    }else{
      videoRef.current.play()
      setIsplaying(true)
    }
    setTimeout(() => {
      setPlayButtonShowing(false)
    },500);
  }