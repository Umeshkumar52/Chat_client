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
import SearchBar from './pages/SearchBar';
import Search from './pages/Search';
function App() {
 const isLogedIn=useSelector((state)=>{return state.auth.isLogedIn})
 console.log(useSelector((state)=>{return state.auth}));
 
  return (
    <div >
     <BrowserRouter>
     <Routes>
     <Route path={isLogedIn?"/":"register"} element={isLogedIn?<Home/>:<Register/>}/>
     <Route path='/createPost' element={<CreatePost/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/chat' element={<ChatApp/>}/>
     <Route path='/reels' element={<Reels/>}/>
     <Route path='/stories' element={<UserStories/>}/>
     <Route path='/friendRequest' element={<FriendRequests/>}/>
     <Route path='/notification' element={<Notification/>}/>
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/' element={<Register/>}/>
     <Route path='chat/inbox' element={<Chat/>}/>
     <Route path='/comments' element={<Comments/>}/>
     <Route path='/reelComments' element={<ReelComments/>}/>
     <Route path='/createReel' element={<NewReel/>}/>
     <Route path='/createStory' element={<NewStory/>}/>
     <Route path='/search' element={<Search/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
