import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, unfollowing, updateUser, userAndPosts } from "../reducers/authReducer";
import { following } from "../reducers/authReducer";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack} from "react-icons/io";
import MediaCard from "../components/MediaCard";
import ReelsCard from "../components/ReelsCard";
import { IoCameraOutline } from "react-icons/io5";
import MessagerUserList from "../helper/MessagerUserList";
import { FiEdit } from "react-icons/fi";
import ReelsLayouts from "../layout/ReelsLayouts";
import ProfileSkelenton from "../skeletons/ProfileSkelenton";
import socket from "../socket";
export default function Profile({ UserName }) {
  const [post, setPost] = useState([]);
  const [reel, setReel] = useState([]);
  const { user } = useSelector((state) => {
    return state.auth;
  });
  const { userName } = useParams();
  const [profileBannerUrl, setProfileBannerUrl] = useState();
  const [profileUrl, setProfileUrl] = useState();
  const [userUpdated, setUserUpdated] = useState(false);
  const [userData, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [friends, setFriends] = useState(null);
  const[isFollowing,setIsFolowing]=useState(false)
  const[friendPopUps,setFriendsPopUps]=useState(false)
  async function profileBannerHandler(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append(`file`, event.target.files[0]);
    formData.append("type", "banner");
    formData.append("_id", user._id);
    if (event.target.files[0]) {
      setProfileBannerUrl(URL.createObjectURL(event.target.files[0]));
    }
    await dispatch(updateUser(formData));
    setUserUpdated(true);
  }
  async function profileHandler(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("type", "profile");
    formData.append("_id", user._id);
    if (event.target.files[0]) {
      setProfileUrl(URL.createObjectURL(event.target.files[0]));
    }
    await dispatch(updateUser(formData));
    setUserUpdated(true);
  }
  const userDetail=useCallback(async() =>{
    const response = await dispatch(
      userAndPosts(userName ? userName : UserName)
    );
    if (
      response.payload &&
      response.payload.data.message != null &&
      response.payload.data.message[0]
    ) {
      setUser(...response.payload.data.message);
      setPost((prev) => [...prev, ...response.payload.data.message[0].myPosts]);
      setReel((prev) => [...prev, ...response.payload.data.message[0].myReels]);
        setFriends(
          response.payload.data?.message[0]?.Following.length +
            response.payload.data?.message[0]?.Followers.length
        );
        if(response.payload.data.message[0].Followers.includes(user._id)){
          setIsFolowing(true)
         }
    }
  })
  async function logoutHandler(event) {
    const response = await dispatch(logout());
    if (response?.payload?.data.success) {
      navigate("/sign-in");
    }
  }
  useEffect(() => {
      userDetail()
  }, [userName])
  function updateDeletPostHandler(_id) {
    const updateData = post.filter((items) => items._id !== _id);
    setPost(updateData);
  }
  function updateDeletReeltHandler(_id) {
    const updateData = reel.filter((items) => items._id !== _id);
    setReel(updateData);
  }
  async function unfollowHandler() {
    socket.emit("unfollowing",{requester:user._id,reciever:userData._id})
     await dispatch(unfollowing({requester:user._id,reciever:userData._id}))     
   } 
   async function followingHandler() {
    socket.emit("following",{requester:user._id,reciever:userData._id})
     await dispatch(following({requester:user._id,reciever:userData._id}))     
   }  
   useEffect(()=>{
    socket.on('unfollowing',(data)=>{
      if(user?._id===data.requester){
        setIsFolowing(!following)
      }
    })
    socket.on("following",(data)=>{
      if(user?._id==data.requester){
        setIsFolowing(true)
        }
     })
   },[socket])    
  return (
    <ReelsLayouts>
    <div className="hiddenScrollBar bg-white md:w-[90%] lg:w-[60%] pb-10 py-2 w-full h-screen overflow-y-scroll">
      {userData? (
        <div className="w-full">
          {/* back handler */}
         <div className="flex flex-col ">
         <div className="p-2 block md:hidden">
            <IoIosArrowBack
              onClick={() => {
                navigate(-1);
              }}
              className="text-3xl"
            />
          </div>
          <div className="relative">
            {/* profile Banner */}
            <div className="relative ring-2 ring-indigo-600 bg-slate-200/40 h-[10rem] w-full">
              {/* {profileBannerUrl || user.profileBanner? */}
              <img
                className="w-full h-full"
                alt="img"
                src={
                  profileBannerUrl ? profileBannerUrl : userData.profileBanner
                }
              />
              {user._id === userData._id ? (
                <label htmlFor="profileBanner">
                  <IoCameraOutline className="absolute text-3xl right-4 bottom-0" />
                </label>
              ) : (
                ""
              )}
              <input
                type="file"
                onChange={profileBannerHandler}
                className="hidden"
                id="profileBanner"
                name="profileBanner"
              />
            </div>
            {/* profile */}
            <div className="absolute flex justify-center px-2 items-center top-[4rem] left-[1rem] ">
              {user._id === userData._id ? (
                <label htmlFor="profile">
                  <FiEdit className="absolute text-xl top-1/3 right-0" />
                  <div className="flex justify-center items-center rounded-full">
                    {profileUrl || userData.avatar ? (
                      <img
                        className="w-[8rem] h-[8rem] border-2 rounded-full"
                        src={profileUrl ? profileUrl : userData.avatar}
                        alt=""
                      />
                    ) : (
                      <img
                        className="w-[8rem] h-[8rem]  border-2 rounded-full"
                        src="#"
                        alt=""
                      />
                    )}
                    <input
                      onChange={profileHandler}
                      type="file"
                      id="profile"
                      className="hidden"
                      name="profile"
                    />
                  </div>
                </label>
              ) : (
                <div>
                  {" "}
                  {profileUrl || userData.avatar ? (
                    <img
                      className="w-[8rem] h-[8rem] border-2 rounded-full"
                      src={profileUrl ? profileUrl : userData.avatar}
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-[8rem] h-[8rem]  border-2 rounded-full"
                      src="#"
                      alt=""
                    />
                  )}
                </div>
              )}
            </div>
            {/* userData */}
            <div className="relative pt-[4rem] gap-3 flex flex-col px-3 pb-[1rem] border-b-2">
              <div>
                <h1 className="text-xl font-bold text-black">
                  {userData.UserName}
                </h1>
                <div className="relative flex gap-4 text-lg font-semibold">
                  <h2 onClick={()=>{setFriendsPopUps(!friendPopUps)}} className="text-indigo-600 cursor-pointer">Friends</h2>
                  <p>{friends}</p>
               {friendPopUps&&userData._id!==user._id&&
                <div id="friendsPopUp" className="absolute p-3 top-8 bg-slate-200 rounded-lg">
                <ul className="cursor-pointer">
                <li>{isFollowing?<button onClick={unfollowHandler}>UnFollow</button>:<button onClick={followingHandler}>Follow</button>}</li>
                <li onClick={() =>
                    navigate("/friendRequest", { state: userData._id })
                  }>Friends</li>
               </ul>
                </div>
}
                </div>
              </div>
              <div className="flex justify-evenly">
                {userData.UserName !== user.UserName ? (
                  <button
                    onClick={() => {
                      MessagerUserList(userData);
                      navigate(
                        `/direct/${userData.UserName}`,
                        { state: userData }
                      );
                    }}
                    className="bg-indigo-600 rounded-lg text-white text-lg font-semibold px-4 py-1"
                  >
                    Message
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/createStory")}
                    className="bg-indigo-600 rounded-lg text-white text-lg font-semibold px-4 py-1"
                  >
                    Add Story
                  </button>
                )}
                {userData.UserName === user.UserName ? (
                  <button
                    onClick={logoutHandler}
                    className="bg-indigo-600 rounded-lg text-white text-lg font-semibold px-4 py-1"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      navigate("/friendRequest", { state: userData._id })
                    }
                    className="bg-indigo-600 rounded-lg text-white text-lg font-semibold px-4 py-1"
                  >
                    Friends
                  </button>
                )}
              </div>
            </div>
          </div>
         </div>
          {/* posts Data */}
          <fieldset className="w-full space-y-6 py-2">
            {/* post Area */}
            <input
              id="post"
              defaultChecked
              className="peer/post hidden"
              name="status"
              type="radio"
            />
            <label
              htmlFor="post"
              className="peer-checked/post:text-sky-500 text-lg font-semibold px-4"
            >
              Post
            </label>
            <input
              id="reels"
              className="peer/reels hidden"
              name="status"
              type="radio"
            />
            <label
              htmlFor="reels"
              className="peer-checked/reels:text-sky-500 text-lg font-semibold"
            >
              Reels
            </label>
            <hr />
            {/* post Card */}
            <div className="hidden peer-checked/post:block space-y-4">
              {post.length ? (
                post.map((Element, index) => {
                  return (
                    <MediaCard
                      self={true}
                      updateDeletPostHandler={updateDeletPostHandler}
                      index={index}
                      key={index}
                      data={Element}
                    />
                  );
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  No posts
                </div>
              )}
            </div>
            {/* ReelsCard */}
            <div className="hidden peer-checked/reels:block overflow-x-hidden space-y-4">
              {reel.length > 0 ? (
                reel.map((Element, index) => {
                  return (
                    <ReelsCard
                      key={index}
                      updateDeletReeltHandler={updateDeletReeltHandler}
                      self={true}
                      index={index}
                      data={Element}
                    />
                  );
                })
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  No Reels
                </div>
              )}
            </div>
          </fieldset>
        </div>
      ):(<ProfileSkelenton/>)}
    </div>
    </ReelsLayouts>
  );
}
