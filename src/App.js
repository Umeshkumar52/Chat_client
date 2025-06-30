import {lazy, Suspense, useEffect, useMemo } from "react";
import ChatApp from "./ChatApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthGaurd from "./authentication/AuthGaurd";
import NotFound from "./components/NotFound";
import {setOffer, setOnlineUsers, setIncomingCall, setCallEnd } from "./reducers/audioCallReducer";
import CallingNotification from "./components/CallingNotification";
import socket from "./socket";
import Loader from "./components/Loader";
const Register=lazy(()=>import ("./authentication/Register"))
const Login=lazy(()=>import ("./authentication/Login"))
const Home=lazy(()=>import ("./pages/Home"))
const Reels=lazy(()=>import ("./pages/Reels"))
const CreatePost=lazy(()=>import ("./pages/CreatePost"))
const FriendRequests=lazy(()=>import ("./pages/FriendRequests"))
const Profile=lazy(()=>import ("./pages/Profile"))
const UserStories=lazy(()=>import ("./components/UserStories"))
const Comments=lazy(()=>import ("./components/Comments"))
const NewReel=lazy(()=>import ("./pages/NewReel"))
const NewStory=lazy(()=>import ("./pages/NewStory"))
const Chat=lazy(()=>import ("./Chat"))
const ReelComments=lazy(()=>import ("./pages/ReelComments"))
const Search=lazy(()=>import ("./pages/Search"))
const SpecificPost=lazy(()=>import ("./components/SpecificPost"))
const SpecificReel=lazy(()=>import ("./components/SpecificReel"))
const AudioCall=lazy(()=>import ("./components/AudioCall"))
const VideoCall=lazy(()=>import ("./components/VideoCall"))
const ResetPassword=lazy(()=>import ("./authentication/ResetPassword"))
const ForgetPassword=lazy(()=>import ("./authentication/ForgetPassword"))
function App() {
  const dispatch=useDispatch()
  const { user } = useSelector((state) => state.auth);
    const { callStatus,acceptCall } = useSelector(
    (state) => state.globalyCall
  );
  useMemo(() => {
    try {
      if (!socket.connected && user) {
        socket.auth = { userName: user.UserName };
        socket.connect()
        socket.emit("rooms", user.UserName);
        socket.on("connect_error", (err) => {
          if (err.message) {
            return;
          }
        });
      }
      return () => socket.disconnect();
    } catch (error) {
      return
    }
  }, []);
useEffect(()=>{
  socket.on("offer", async ({ offer, type, callerUser, calleeUser}) => {
      dispatch(setOffer(offer));
      dispatch(
        setIncomingCall({
          type,
          callerUser,
          calleeUser,
          callStatus: "incoming",
        })
      );
    });
   socket.on("end-call",()=>{
   dispatch( setCallEnd())
   })
  socket.on("online",(onlineUser)=>{
 dispatch(setOnlineUsers(onlineUser))
  })
},[socket])
  const routes = [
    { path: "/", element:<Home/>, protected: true },
    { path: "/createPost", element: <CreatePost />, protected: true },
    { path: "/sign-in", element: <Login />, protected: false },
    { path: "/sign-up", element: <Register />, protected: false },
    { path: "/forget-password", element:<ForgetPassword/>, protected: false },
    { path: "/reset/:token", element:<ResetPassword/>, protected: false },
    { path: "*", element: <NotFound />, protected: false },
    { path: "/reels", element: <Reels />, protected: true },
    { path: "/:userName", element: <Profile />, protected: true },
    { path: "/stories", element: <UserStories />, protected: true },
    { path: "/friendRequest", element: <FriendRequests/>, protected:true},
    {
      path: "/direct/:reciever",
      element: <Chat />,
      protected: true,
    },
    { path: "/direct", element: <ChatApp />, protected: true },
    { path: "/comment/:post_id", element: <Comments />, protected: true },
    { path: "/comment/:reel_id", element: <ReelComments />, protected: true },
    { path: "/createReel", element: <NewReel />, protected: true },
    { path: "/createStory", element: <NewStory />, protected: true },
    { path: "/search", element: <Search />, protected: true },
    { path: "/post/:post_id", element: <SpecificPost />, protected: true },
    { path: "/reel/:reel_id", element: <SpecificReel />, protected: true },
    { path: "/video", element: <VideoCall />, protected: true },
    { path: "/audio", element: <AudioCall />, protected: true },
  ];
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loader/>}>
        <Routes>
          {routes.map(({ path, element, protected: isProtected }) =>
            isProtected ? (
              <Route
                key={path}
                path={path}
                element={<AuthGaurd>{element}</AuthGaurd>}
              />
            ) : (
              <Route key={path} path={path} element={element} />
            )
          )}
        </Routes>
        </Suspense>
        {/* incoming call notification */}
         {callStatus === "incoming" && !acceptCall && <CallingNotification />}
      </BrowserRouter>
    </div>
  );
}

export default App;
