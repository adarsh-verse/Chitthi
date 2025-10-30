import React, { useState, useEffect } from "react";
import { FaRegSmile } from "react-icons/fa";
import { IoSend, IoSearch, IoImageOutline, IoClose } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import { serverUrl } from "../main";
import axios from "axios";
import { addMessage } from "../redux/messageSlice";
import useMessages from "../customHooks/useMessages";

const ChatWindow = ({ activeChat, setActiveChat }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  // Fetch messages for the active chat
  const { messages, loading } = useMessages(activeChat?._id);
  console.log(messages);

  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  // --- Handle image selection ---
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontendImage(URL.createObjectURL(file));
    }
  };

  // --- Send a message ---
  const handleSendMessage = async () => {
    if (!message.trim() && !backendImage) return;
    if (!activeChat?._id) return alert("Select a user to send a message!");

    const formData = new FormData();
    formData.append("message", message);
    if (backendImage) formData.append("image", backendImage);

    try {
      const result = await axios.put(
        `${serverUrl}/api/message/send/${activeChat._id}`,
        formData,
        { withCredentials: true }
      );

      // Instantly show new message in UI
      dispatch(
        addMessage({
          receiverId: activeChat._id,
          senderId: userData._id,
          message: message,
          image: result.data.image || null,
          createdAt: new Date().toISOString(),
        })
      );

      setMessage("");
      setFrontendImage(null);
      setBackendImage(null);
      setShowPicker(false);
    } catch (err) {
      console.error("Error sending message:", err.response?.data || err.message);
    }
  };

  // --- Optional Real-time Polling (every 3 seconds) ---
  useEffect(() => {
    if (!activeChat?._id) return;
    const interval = setInterval(() => {
      axios
        .get(`${serverUrl}/api/message/${activeChat._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          dispatch({ type: "message/setMessages", payload: res.data });
        })
        .catch((err) =>
          console.error("Polling error:", err.response?.data || err.message)
        );
    }, 3000);

    return () => clearInterval(interval);
  }, [activeChat?._id, dispatch]);

  return (
    <div
      className={`${activeChat ? "flex" : "hidden md:flex"
        } flex-col flex-1 bg-gray-50 relative`}
    >
      {/* Header */}
      <div className="h-[60px] bg-gray-50 border-b border-gray-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveChat(null)}
            className="md:hidden text-gray-600 text-2xl font-bold mr-2"
          >
            ←
          </button>

          {activeChat ? (
            <>
              <img
                src={
                  activeChat.profile_Img?.trim()
                    ? activeChat.profile_Img
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="chat"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">
                  {activeChat.name || activeChat.userName}
                </h4>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </>
          ) : (
            <div className="text-gray-600 font-semibold">
              Select a chat to start messaging
            </div>
          )}
        </div>

        {activeChat && (
          <div className="flex items-center gap-4 text-gray-600 text-xl">
            <IoSearch />
            <HiOutlineDotsVertical />
          </div>
        )}
      </div>

      {/* Messages */}
      {activeChat ? (
        <>
          <div className="flex-1 bg-[url('https://i.ibb.co/d0jGxvZ/chat-bg.png')] bg-cover bg-center overflow-y-auto p-4">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : !messages || messages.length === 0 ? (
              <div className="text-center text-gray-500">
                No messages yet. Say hi! 👋
              </div>
            ) : (
              <>
                {Array.isArray(messages) && messages.length > 0 ? (
                  messages.flat().map((msg, i) => {
                    const isSender = msg.sender === userData._id;
                    return !isSender ? (
                      <ReceiverMessage
                        key={msg._id || i}
                        message={msg.message}
                        image={msg.image}
                        name={activeChat.name}
                      />
                    ) : (
                      <SenderMessage key={msg._id || i} message={msg.message} image={msg.image} />
                    );
                  })
                ) : (
                  <div className="text-center text-gray-500">No messages yet. Say hi! 👋</div>
                )}
              </>
            )}

            {frontendImage && (
              <div className="flex justify-end mb-3 pr-6">
                <div className="relative">
                  <img
                    src={frontendImage}
                    alt="preview"
                    className="max-w-[200px] rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => {
                      setFrontendImage(null);
                      setBackendImage(null);
                    }}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-[2px] shadow"
                  >
                    <IoClose className="text-gray-700 text-sm" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="h-[70px] bg-gray-50 border-t border-gray-200 flex items-center gap-3 px-4 relative">
            <div className="relative">
              <FaRegSmile
                className="text-2xl text-gray-600 cursor-pointer hover:text-sky-500 transition"
                onClick={() => setShowPicker((prev) => !prev)}
              />
              {showPicker && (
                <div className="absolute bottom-14 left-0 z-50 shadow-lg">
                  <EmojiPicker
                    width={300}
                    height={400}
                    theme="light"
                    onEmojiClick={(emojiData) =>
                      setMessage((prev) => prev + emojiData.emoji)
                    }
                  />
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                onChange={handleImage}
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition"
              >
                <IoImageOutline className="text-2xl text-gray-600 hover:text-sky-500 transition" />
              </label>
            </div>

            <input
              type="text"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-3 rounded-full bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />

            <button
              onClick={handleSendMessage}
              className="p-3 bg-sky-500 rounded-full hover:bg-sky-600 transition"
            >
              <IoSend className="text-white text-xl" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <p className="text-lg font-medium text-center px-4">
            Welcome to <span className="text-sky-500">Chitthi 💌</span> <br />
            Select a chat to start your conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
