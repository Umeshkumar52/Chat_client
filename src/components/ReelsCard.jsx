import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FcLike } from "react-icons/fc";
import { FaRegComment, FaRegHeart } from "react-icons/fa6";
import { following } from "../reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import WebShare from "../helper/WebShare";
import { deleteReel, disLikeReel, likeReel } from "../reducers/reelsReducer";
import socket from "../socket";
import videoPlayerHandler from "../helper/videoPlayerHandler";
import PlayPause from "./PlayPause";
import { BsThreeDotsVertical } from "react-icons/bs";
export default function ReelsCard({
  data,
  updateDeletReeltHandler,
  index,
  self,
}) {
  const dateOption = {
    day: "2-digit",
    month: "short",
  };
  let time = new Date(data.createdAt);
  const dayAndMonth = time.toLocaleDateString(undefined, dateOption);
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const[deleteButtonVisibility,setDeleteButtonVisibility]=useState(false)
  const [postDeletCall, setPostDeletCall] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playButtonShowing, setPlayButtonShowing] = useState(false);
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  function videoplay(event) {
    event.preventDefault();
    if (isPlaying) {
      videoRef.current.pause();
      setPlayButtonShowing(true);
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch((Error) => {
        return;
      });
      setPlayButtonShowing(true);
      setIsPlaying(true);
    }
    setTimeout(() => {
      setPlayButtonShowing(false);
    }, 700);
  }
  videoPlayerHandler("video", isPlaying);
  async function followingHandler() {
    await dispatch(
      following({ requester: user._id, reciever: data.author._id })
    );
  }
  async function reelLikeHandler() {
    setIsLiked(true);
    await dispatch(likeReel({ post_id: data._id, author: user._id }));
  }
  async function reelDisLikeHandler() {
    setIsLiked(false);
    await dispatch(disLikeReel({ post_id: data._id, author: user._id }));
  }
  function postDeleteOpenHandler() {
    document.getElementById("reelDelete" + index).style.width = "46px";
  }
  function postDeletecloseHandler() {
    if (postDeletCall) {
      document.getElementById("reelDelete" + index).style.width = "0px";
    }
  }
  async function ReelDeleteHandler() {
    const confirm=window.confirm("Are you sure you want to delete Reel")
    if(confirm){
      const response = await dispatch(
        deleteReel({ reel_id: data._id, public_id: data.public_id })
      )
      if (response.payload) {
        updateDeletReeltHandler(data._id);
      }
    }else{
      setDeleteButtonVisibility(false)
    }
   
  }
  useEffect(() => {
    if (data.author.Followers) {
      data.author.Followers.map((Element) => {
        if (Element == user._id) {
          setIsFollowing(true);
        }
      });
    }
    if (data.likes) {
      data.likes.map((Element) => {
        if (Element == user._id) {
          setIsLiked(true);
        }
      });
    }
  }, []);
  useEffect(() => {
    socket.on("following", (following) => {
      if (data.author._id == following.reciever) {
        setIsFollowing(true);
      }
    });
  }, [socket]);
  return (
    <div
      onClick={postDeletecloseHandler}
      className="vid relative snap-start bg-black w-full h-[100vh] flex flex-col gap-3"
    >
      <div className="relative">
      <video
        className="video w-full h-[100vh]"
        ref={videoRef}
        onClick={videoplay}
       loop
        id="video"
        src={data.secure_url}
      >
      </video>
      {data.author._id == user._id && self && (
          <div className="absolute text-white text-2xl top-4 right-4 w-14  flex justify-end">
            <BsThreeDotsVertical onClick={()=>setDeleteButtonVisibility(!deleteButtonVisibility)} />
            {deleteButtonVisibility&&
            <div id={"reelDelete" + index} className="absolute w-auto right-4 top-4">
              <ul>
                <li>
                  <button onClick={ReelDeleteHandler}>Delete</button>
                </li>
              </ul>
            </div>
            }
          </div>
        )}
        {/* playpause */}
      {playButtonShowing&&<PlayPause isPlaying={isPlaying}/>}
      </div>
    
      {/* sharing thoghts section */}
      <div className="absolute bottom-24 text-white font-semibold right-3 flex">
        <div className="space-y-2">
          <div className="flex flex-col gap-6">
            <div className="cursor-pointer flex flex-col items-center">
              {isLiked ? (
                <FcLike className="text-3xl" onClick={reelDisLikeHandler} />
              ) : (
                <FaRegHeart className="text-3xl" onClick={reelLikeHandler} />
              )}
              <h4>
                {isLiked ? `${data.likes.length + 1}` : `${data.likes.length}`}
              </h4>
            </div>
            <div className="flex flex-col items-center">
              <FaRegComment
                className="text-3xl"
                onClick={(event) => {
                  event.preventDefault();
                  navigate(`/comment/${data._id}`, {
                    state: {
                      post_id: data._id,
                      user: {
                        UserName: user.UserName,
                        avatar: user.avatar,
                        _id: user._id,
                      },
                      type: "Reel",
                    },
                  });
                }}
              />
              <h1>{`${data.Comments.length}`}</h1>
            </div>
            <WebShare data={`http://localhost:3000/reel/${data?._id}`} />
          </div>
        </div>
      </div>
      {/* authore  */}
      <div className="absolute text-white bottom-3 w-full h-[10vh] px-2 flex justify-between">
        <div className="flex gap-3">
          <Link to={`/${data.author.UserName}`}>
            <div className="flex">
              {data.author.avatar ? (
                <img
                  src={data.author.avatar}
                  className="w-10 h-10 rounded-full border-2"
                />
              ) : (
                <CgProfile className="text-4xl" />
              )}
            </div>
          </Link>
          <div className="flex flex-col">
            <div className=" flex font-semibold gap-2">
              <h2 className="font-semibold text-white text-lg">{`${data.author.UserName.slice(
                0,
                10
              )}...`}</h2>
              {data.author._id != user._id ? (
                <div className="px-2 py-1 text-base rounded-xl font-semibold border-2">
                  {!isFollowing ? (
                    <button onClick={followingHandler}>Follow</button>
                  ) : (
                    <button disabled>Following</button>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <h1 className="text-sm  italic">Original music</h1>
          </div>
        </div>
        {/* {data.author._id == user._id && self ? (
          <div className="relative w-14  flex justify-end">
            <BsThreeDotsVertical onClick={postDeleteOpenHandler} />
            <div id={"reelDelete" + index} className="w-0 absolute top-4">
              <ul>
                <li>
                  <button onClick={ReelDeleteHandler}>Delete</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
}
