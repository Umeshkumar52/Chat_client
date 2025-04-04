import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchUserList({ data, type }) {
  const navigate = useNavigate();
  return (
    <div className="userList h-screen flex flex-col py-6 gap-4 overflow-y-scroll">
      {
        data.map((user) => {
          return (
            <div
            onClick={()=>navigate(`/${user.UserName}`)}
              key={user._id}
              className="w-full h-fit flex gap-2 p-2 hover:bg-slate-200/50 text-white px-2 cursor-pointer"
            >
              <img src={user.avatar} className="w-14 h-14 rounded-full" />
              <div>
                <h1 className="text-lg font-semibold text-black">
                  {" "}
                  {user.UserName}
                </h1>
                <h2 className="text-xs italic text-[#9da1a1]">{user.Name}</h2>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}
