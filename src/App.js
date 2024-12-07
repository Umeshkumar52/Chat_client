import ChatApp from './ChatApp';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Reels from './pages/Reels';
import CreatePost from './pages/CreatePost';
import FriendRequests from './pages/FriendRequests';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import { useSelector } from 'react-redux';
import UserStories from './components/UserStories';
import Comments from './components/Comments';
import NewReel from './pages/NewReel';
import NewStory from './pages/NewStory';
import Chat from './Chat';
import ReelComments from './pages/ReelComments';
import Search from './pages/Search';
import socket from './socket';
import { useEffect } from 'react';
import SpecificPost from './components/SpecificPost';
import SpecificReel from './components/SpecificReel';
import { localeData } from 'moment-timezone';
import AudioCall from './components/AudioCall'
import VideoCall from './components/VideoCall'
function App() {   
 const {user,isLogedIn}=useSelector((state)=>{return state.auth})  
useEffect(()=>{
  if(user.UserName){
    socket.emit("rooms",user.UserName);
    setTimeout(()=>{
      socket.auth = {userName:user.UserName};
      socket.connect();
    socket.on("connect_error", (err) => {
      if (err.message) {
        console.log("error", err.message);
      }
    })  
    },1000)
  }
},[user.UserName])
 useEffect(()=>{
  socket.on("private_msg",(data) => {
    console.log(data);
  })
 },[socket])
window.addEventListener('beforeunload',()=>{socket.emit('offline',socket.id)})
  return (
    <div>
     <BrowserRouter>
     <Routes>
     <Route path="/" element={user.UserName?<Home/>:<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/createPost' element={<CreatePost/>}/>
     <Route path='/direct' element={<ChatApp/>}/>
     <Route path='/reels' element={<Reels/>}/>
     <Route path='/stories' element={<UserStories/>}/>
     <Route path='/friendRequest' element={<FriendRequests/>}/>
     <Route path='/notification' element={<Notification/>}/>
     <Route path=':userName' element={<Profile/>}/>
     <Route path='/direct/:sender/inbox/:reciever' element={<Chat/>}/>
     <Route path='/comment/:post_id' element={<Comments/>}/>
     <Route path='comment_/:reel_id' element={<ReelComments/>}/>
     <Route path='/createReel' element={<NewReel/>}/>
     <Route path='/createStory' element={<NewStory/>}/>
     <Route path='/search' element={<Search/>}/>
     <Route path='/post/:post_id' element={<SpecificPost/>}/>
     <Route path='/reel/:reel_id' element={<SpecificReel/>}/>
     <Route path='audio' element={<AudioCall/>}/>
     <Route path='video' element={<VideoCall/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
