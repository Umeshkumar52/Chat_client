import { useCallback, useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allReels } from "../reducers/reelsReducer";
import ReelsCard from "../components/ReelsCard";
import ReelsLayouts from "../layout/ReelsLayouts";
import ReelSkelenton from "../skeletons/ReelSkelenton";
import { TbLoader2 } from "react-icons/tb";
export default function Reels() {
  const navigate = useNavigate();
  const loaderRef = useRef(null);
  const [reels, setReels] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const pageSize = 10;
  async function ReelsHandler() {
    const response = await dispatch(
      allReels({ offset: page, limit: pageSize })
    );
    if (response.payload) {
       setPage(prev=>prev+pageSize)
      setReels((reels) => [...reels, ...response.payload.data.message]);
      setIsLoading(false);
    }
    if (response.payload?.data?.message.length < pageSize) {
      setHasMore(false);
    }
  }
  useEffect(() => {
    ReelsHandler();
  }, []);
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isLoading) {
      // setPage(prev=>prev+pageSize)
      setIsLoading(true)
      ReelsHandler()
    }
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
    };
  }, [handleObserver]);
  return (
    <ReelsLayouts>
      <div
        id="reelContainer"
        className="hiddenScrollBar overflow-y-scroll h-[100vh] relative lg:w-[50%] md:w-[70%] w-full space-y-[1px] snap-y snap-mandatory"
      >
        {reels.length > 0 ? (
          reels.map((Element, index) => {
            return <ReelsCard key={index} index={index} data={Element} />;
          })
        ) : (
          <ReelSkelenton />
        )}
         <div ref={loaderRef} className="flex justify-center font-semibold text-center">{isLoading?<TbLoader2 className="animate-spin text-blue-700 text-2xl"/>:<div className="text-sm text-center">No more post !</div>}</div>
        <div className="block md:hidden fixed top-3 left-3">
          <div className="flex items-center gap-4 text-white">
            <IoMdArrowRoundBack
              onClick={() => navigate(-1)}
              className="font-semibold text-center text-3xl inline cursor-pointer"
            />
            <Link className="inline text-2xl font-normal">Reels</Link>
          </div>
        </div>
      </div>
    </ReelsLayouts>
  );
}
