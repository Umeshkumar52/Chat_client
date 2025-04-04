import React, { createContext, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import NabigationBar from "../components/NavigationBar";
import socket from "../socket";
import PostedAlert from "../helper/PostedAlert";
import Navigator from "../components/Navigator";
import Slider from "../components/Slider";
import useWindowResize from "../helper/useWindowResize";
import Search from "./Search";
import FriendRequests from "./FriendRequests";
import SideNavBar from "../components/SideNavBar";
export default function Layout({ children }) {
  const[muted,setMuted]=useState(false)
  const [postAlert, setPostAlert] = useState(false);
  const [sliderOpen, setSliderOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const { user } = useSelector((state) => state?.auth);
  useWindowResize((newWidth) => {
    setWindowSize(newWidth);
  });
  useCallback(() => {
    socket.on("post", () => {
      setPostAlert(true);
      setTimeout(() => {
        setPostAlert(false);
      }, 1500);
    });
  }, [socket]);  
  return (
    <div className="overflow-hidden bg-slate-100 md:flex gap-8 ">
      <SideNavBar/>
      <div className=" relative w-full h-[100vh] flex flex-col text-black">
        <NabigationBar
          searching={searching}
          setSearching={setSearching}
          sliderOpen={sliderOpen}
          setSliderOpen={setSliderOpen}
          user={user}
        />
        <div className="flex gap-4 ">
          {children}
          {windowSize > 768 ? (
            <div className="min-w-[45%]">
              <FriendRequests/>
            </div>
          ) : (
            ""
          )}
        </div>
        {sliderOpen ? <Slider /> : ""}
        {postAlert ? <PostedAlert /> : ""}
        <Navigator />
      </div>
     {searching && windowSize>766 || windowSize<766 && searching ?<Search searching={searching} setSearching={setSearching}/>:""}
    </div>
  );
}
