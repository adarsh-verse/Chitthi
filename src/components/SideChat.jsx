import React from "react";
import { IoSearch } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../main";
import { getAllUsers } from "../customHooks/api";
import { setOtherUserData, setUserData } from "../redux/UserSlice";
import { useNavigate } from "react-router-dom";

async function getUsers() {
  return await getAllUsers();
}


const SideChat = ({  activeChat, setActiveChat }) => {
  const { userData, otherUserData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hadleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      dispatch(setOtherUserData([]));
      console.log("Logged Out successfully");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`${
        activeChat ? "hidden md:flex" : "flex"
      } flex-col w-full md:w-[35%] lg:w-[30%] h-full bg-white border-r border-gray-300`}
    >
     
      <div className="h-[70px] flex items-center justify-between px-4 border-b border-gray-200 bg-sky-400 shadow-md text-white">

        
        <div className="flex items-center gap-3 cursor-pointer" onClick={()=>navigate("/profile")}>
          <img
            src={
              userData?.profile_Img && userData.profile_Img.trim() !== ""
      ? userData.profile_Img :
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="profile"
            className="w-11 h-11 rounded-full border-2 border-white object-cover shadow-md"
          />
          <div className="flex flex-col leading-tight">
            <h2 className="font-semibold text-[16px] truncate max-w-[150px]">
              {userData?.name || userName}
            </h2>
            <span className="text-xs opacity-90">Online</span>
          </div>
        </div>

        
        <div className="flex items-center gap-4 text-[22px]">
          <IoSearch className="cursor-pointer hover:text-gray-200 transition" />
          <HiOutlineDotsVertical className="cursor-pointer hover:text-gray-200 transition" />
          <button
            className="hover:text-red-200 transition"
            title="Logout"
            onClick={hadleLogOut}
          >
            <FiLogOut />
          </button>
        </div>
      </div>

    
      <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
        <input
          type="text"
          placeholder="Search or start new chat"
          className="w-full p-2 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
        />
      </div>

     
      <div className="flex-1 overflow-y-auto bg-white">
        {otherUserData?.length > 0 ? (
          otherUserData.map((chat) => (
            <div
              key={chat._id}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all border-b border-gray-100"
              onClick={() => setActiveChat(chat)}
            >
              <img
                src={
                  chat.profile_Img ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="user"
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-800">
                    {chat.name || chat.userName}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {chat.createdAt?.substring(0, 10)}
                  </p>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.msg || "Tap to start chatting..."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500 text-sm">
            No users available
          </div>
        )}
      </div>
    </div>
  );
};

export default SideChat;
