import React, {lazy, Suspense, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSocialPost} from "../reducers/socialPostController";
import {useNavigate } from "react-router-dom";
import PageLocRes from "../helper/PageLocRes";
import Layout from "./Layout";
import StoriesPanel from "../components/StoriesPanel";
import MediaCard from '../components/MediaCard'
import PostSkelenton from "../skeletons/PostSkelenton";
export default function Home() {
  const dispatch = useDispatch();
  PageLocRes("hiddenScrollBar");
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [postAlert, setPostAlert] = useState(false);
  const windowScroller = document.querySelector("#postContainer");
  const auth = useSelector((state) => {
    return state.auth;
  });
  const socialPost = useSelector((state) => {
    return state.socialPost;
  });
  const [post, setPost] = useState(socialPost.post || []);
  const notification = useSelector((state) => {
    return state.notification.unReadNotification;
  });
  async function postHandler() {
    const limit=10
    setIsLoading(!isLoading)
    const response = await dispatch(
      allSocialPost({ offset: offset, limit:limit})
    );
    if (response?.payload) {
      setOffset((prevOffset) => prevOffset + limit);
      setPost((prev) => [...prev, ...response.payload.data.message]);
      setIsLoading(!isLoading);
    }
  }
  useEffect(() => {
    postHandler()  
  }, [page])
  function handleScroll() {
    const scrollTop = window?.pageYOffset || windowScroller?.scrollTop;
    const scrollHeight = windowScroller?.scrollHeight;
    const clientHeight =windowScroller?.innerHeight || document?.documentElement?.clientHeight;
    if (scrollTop + clientHeight + 2 >= scrollHeight) {
      if(!isLoading){
        setPage((prev) => prev + 1);
      }
    }
  } 
  return (
    <Layout>
      <div onScroll={handleScroll} id="postContainer" className="hiddenScrollBar relative w-full md:w-[50%]  h-[100vh] overflow-y-scroll pb-28 md:pb-16 space-y-2">
        <StoriesPanel />
        {post?.length > 0
          ? post.map((Element, index) => {
              return <MediaCard key={index} index={index} data={Element} />
            })
          :<div className="w-full flex flex-col gap-4 "><PostSkelenton/><PostSkelenton/></div>}
        {isLoading&&<div className="text-3xl font-semibold text-center animate-pulse">Loading...</div>}
      </div>
    </Layout>
  );
}
