import  { useEffect } from "react";
import { useDispatch } from "react-redux";
import { specificPost } from "../reducers/socialPostController";
import { useParams } from "react-router-dom";
import { useState } from "react";
import MediaCard from "./MediaCard";
import PostSkelenton from '../skeletons/PostSkelenton'

export default function SpecificPost() {
  const { post_id } = useParams();
  const [post, setPost] = useState();
  const dispatch = useDispatch();
  async function postHandler() {
    const response = await dispatch(specificPost(post_id));
    if (response.payload) {
      setPost(response.payload.data.message);
    }
  }
  useEffect(() => {
    postHandler();
  }, []);

  return (
     <div className="hiddenScrollBar overflow-y-scroll h-[100vh]">
      {post?
      <MediaCard data={post}/>:<PostSkelenton/>}
     </div>
  );
}
