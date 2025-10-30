import React, { useState } from "react";
import SideChat from "../components/SideChat";
import ChatWindow from "../components/ChatWindow";
import useMessages from "../customHooks/useMessages";


const Home = () => {
 useMessages()
  const [activeChat, setActiveChat] = useState(null);

  const chats = [
    { id: 1, name: "Anuj", msg: "Hey! How are you?", time: "10:15 AM" },
    { id: 2, name: "Ayush", msg: "Let’s meet tomorrow!", time: "11:02 AM" },
    { id: 3, name: "Aditya", msg: "Working on project?", time: "09:40 AM" },
    { id: 4, name: "Priya", msg: "😂😂", time: "Yesterday" },
  ];

  return (
    <div className="w-full h-screen flex bg-gray-100 text-gray-800">
      <SideChat
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
      />
      <ChatWindow activeChat={activeChat} setActiveChat={setActiveChat} />
    </div>
  );
};

export default Home;
