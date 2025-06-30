import React, { useEffect, useState } from "react";
import { following, unfollowing } from "../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import { useNavigate } from "react-router-dom";
export default function UserFollowerCard({ data }) {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const user_id = useSelector((state) => {
    return state.auth.user._id;
  });
  const dispatch = useDispatch();
  async function followingHandler() {
    // setIsFollowing(!isFollowing);
    await dispatch(following({ requester: user_id, reciever: data._id }));
  }
  async function unfollowingHandler() {
    // setIsFollowing(!isFollowing);
    await dispatch(unfollowing({ requester: user_id, reciever: data._id }));
  }
  useEffect(() => {
    data.Followers.map((Element) => {
      if (Element == user_id) {
        setIsFollowing(true);
      }
    });
  }, []);
  useEffect(()=>{
    socket.on('following',(following)=>{
     if(data._id==following.reciever){
       setIsFollowing(!isFollowing)
       }
    })
    socket.on('unfollowing',(following)=>{
      if(data._id==following.reciever){
        setIsFollowing(!following)
      }
     })
  },[socket])
  return (
   <div  className="w-full flex  justify-between items-center h-fit cursor-pointer hover:bg-slate-100 py-2 px-[1rem]">
      <div onClick={() => navigate(`/${data.UserName}`)}  className="flex items-center gap-3">
        <img
          className="size-14 border-2 border-black rounded-full"
          src={data.avatar}
        />
        <div className="flex flex-col gap-0">
          <div className="flex gap-2">
            <h2 className="text-lg font-semibold ">{`${data.UserName.slice(
              0,
              10
            )}..`}</h2>

          </div>
          <h2 className="text-sm font-medium text-slate-500 ">{data.Name}</h2>
        </div>
      </div>
      {!isFollowing ? (
        <button
          onClick={followingHandler}
          className="bg-[#2b29b6] rounded-lg hover:ring-2 hover:bg-[#22217c] text-white py-2 px-6 text-sm font-semibold"
        >
          Follow
        </button>
      ) : (
        <button
          onClick={unfollowingHandler}
          className="px-4 py-2 rounded-lg hover:bg-[#cbc8c8] hover:ring-2 bg-[#f0f0f0]"
        >
          Remove
        </button>
      )}
    </div>
  );
}
