import {useCallback, useEffect,useRef,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allSocialPost} from "../reducers/socialPostController";
import PageLocRes from "../helper/PageLocRes";
import Layout from "../layout/Layout";
import StoriesPanel from "../components/StoriesPanel";
import MediaCard from '../components/MediaCard'
import PostSkelenton from "../skeletons/PostSkelenton";
import { prevPosts } from "../reducers/socialPostController";
import { TbLoader2 } from "react-icons/tb";
export default function  Home() {
  const dispatch = useDispatch();
  PageLocRes("hiddenScrollBar");
  const loaderRef=useRef(false)
  const [isLoading, setIsLoading] = useState(false);
  const {post,hasMore,fetchedPost}=useSelector((state)=>state.socialPost)
  const [page, setPage] = useState(fetchedPost||0);
  const [postData, setPostData] = useState([]);
  const pageSize=10;  
  async function postHandler(){
    setIsLoading(true)
    const response = await dispatch(allSocialPost({ offset: page, limit:pageSize}));
     if(response?.payload){
      setIsLoading(false);
      setPage((prev) => prev + pageSize);
      setPostData((prev) => [...prev, ...response.payload?.data?.message]);
    }
  }
  useEffect(()=>{
  if(post?.length<=0){
   postHandler()
  }
  },[])  
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isLoading) {
      setIsLoading(true)
      postHandler()
      
    }return
  },[page]);
  useEffect(() => {
    const obserber = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px",
      threshold:0.1
    });
    if (loaderRef.current) {
      obserber.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        obserber.unobserve(loaderRef.current);
      }
       dispatch(prevPosts({
        postData,
        fetchedPost:page
      }))
    };
  }, [handleObserver]); 
  return (
    <Layout>
      <div id="postContainer" className="hiddenScrollBar relative w-full lg:w-[50%]  h-[100vh] overflow-y-scroll overflow-x-hidden pb-28 md:pb-16 space-y-2">
        <StoriesPanel />
         {postData?.length >0
          ? postData.map((Element, index) => {
              return <MediaCard key={Element._id+index} index={index} data={Element} />
            })
          :<div className="w-full flex flex-col gap-4 "><PostSkelenton/><PostSkelenton/></div>}
        <div ref={loaderRef} className="flex justify-center font-semibold text-center">{isLoading?<TbLoader2 className="animate-spin text-blue-700 text-2xl"/>:<div className="text-sm text-center">No more post !</div>}</div>
      </div>
    </Layout>
  );
}
