import React from "react";
import "./chat.css";
import ProfilePic from "../../assets/images/defaultProfile.png";
import { getMessages, getUser, addMessages } from "../../api/api";
import moment from "moment";
import InputEmoji from "react-input-emoji";

function ChatB({ chat, currentUser, setSendMessage, receivedMessage }) {
  const [userData, setUserData] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState();
  const scroll = React.useRef();

  React.useEffect(() => {
    const userId = chat?.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    chat && getUserData();
  }, [chat, currentUser]);
  React.useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    chat && fetchMessages();
  }, [chat]);
  React.useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    setSendMessage({ ...message, receiverId });
    try {
      const { data } = await addMessages(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };
  React.useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? userData.profilePicture
                        : ProfilePic
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>{userData?.name}</span>
                  </div>
                </div>
              </div>
              <hr
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body">
              {messages.map((message, i) => (
                <div
                  ref={scroll}
                  key={i}
                  className={
                    message.senderId === currentUser ? "message own" : "message"
                  }
                >
                  <span>{message.text}</span>{" "}
                  <span>{moment(message.createdAt).fromNow()}</span>
                </div>
              ))}
            </div>
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji
                value={newMessage}
                onChange={setNewMessage}
                cleanOnEnter
                placeholder="Type a message"
                onEnter={handleSend}
              />
              <div
                className="button-send button send-button"
                style={{ padding: "19px" }}
                onClick={handleSend}
              >
                Send
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
}

export default ChatB;
