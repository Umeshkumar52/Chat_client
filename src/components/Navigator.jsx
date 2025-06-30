import { BiMoviePlay } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Navigator() {
  const { user } = useSelector((state) => state?.auth);  
  return (
    <div className="w-full flex md:hidden sticky bottom-0 justify-between bg-white text-3xl space-x-10 p-2">
      <Link to="/">
        <IoMdHome />
      </Link>
      <Link to="/reels">
        <BiMoviePlay />
      </Link>
      <Link to="friendRequest">
        <FaUserGroup />
      </Link>
      <Link to={`/${user?.UserName}`} className="size-8 rounded-full">
        {user?.avatar ? (
          <img
          alt="Profile"
            src={user.avatar}
            className="w-full h-full border-black rounded-full border-2"
          />
        ) : (
          <CgProfile className="h-full w-full" />
        )}
      </Link>
    </div>
  );
}
