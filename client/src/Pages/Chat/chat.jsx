import React from "react";
import { Conversation, Logo, NavIcons } from "../../components";
import ChatB from "../../components/Chat/chat";
import "./chats.css";
import { userChats } from "../../api/api";
import { io } from "socket.io-client";

function Chat() {
  const { oldUser } = JSON.parse(localStorage.getItem("profile"));
  const [chats, setChats] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState();
  const [onlineUsers, setOnlineUsers] = React.useState([]);

  const [sendMessage, setSendMessage] = React.useState(null);
  const [receivedMessage, setReceivedMessage] = React.useState(null);
  const socket = React.useRef();
  React.useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(oldUser._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [oldUser._id]);

  React.useEffect(() => {
    socket.current = io("http://localhost:4000");
    socket.current.emit("new-user-add", oldUser._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [oldUser._id]);
  React.useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  React.useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== oldUser._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  


  return (
    <div className="Chat">
      <div className="Left-side-chat">
        <Logo />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div key={chat._id} onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={oldUser._id} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        {/* <ChatBox chat={currentChat} currentUser={oldUser._id} /> */}
        <ChatB
          chat={currentChat}
          currentUser={oldUser._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
}

export default Chat;
