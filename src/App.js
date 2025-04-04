import {useMemo } from "react";
import ChatApp from "./ChatApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Reels from "./pages/Reels";
import CreatePost from "./pages/CreatePost";
import FriendRequests from "./pages/FriendRequests";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";
import UserStories from "./components/UserStories";
import Comments from "./components/Comments";
import NewReel from "./pages/NewReel";
import NewStory from "./pages/NewStory";
import Chat from "./Chat";
import ReelComments from "./pages/ReelComments";
import Search from "./pages/Search";
import socket from "./socket";
import SpecificPost from "./components/SpecificPost";
import SpecificReel from "./components/SpecificReel";
import AudioCall from "./components/AudioCall";
import VideoCall from "./components/VideoCall";
import AuthGaurd from "./components/AuthGaurd";
function App() {
  const { user } = useSelector((state) => state.auth);
  //  socket connection usememo prevent unneccasary re render
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
  const routes = [
    { path: "/", element:<Home/>, protected: true },
    { path: "/createPost", element: <CreatePost />, protected: true },
    { path: "/sign-up", element: <Register />, protected: false },
    { path: "/sign-in", element: <Login />, protected: false },
    { path: "/reels", element: <Reels />, protected: true },
    { path: ":userName", element: <Profile />, protected: true },
    { path: "/stories", element: <UserStories />, protected: true },
    { path: "/friendRequest", element: <FriendRequests />, protected: true },
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
    { path: "/post/:post_id", element: <SpecificPost />, protected: false },
    { path: "/reel/:reel_id", element: <SpecificReel />, protected: false },
    { path: "/video", element: <VideoCall />, protected: true },
    { path: "/audio", element: <AudioCall />, protected: true },
  ];
  return (
    <div>
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
