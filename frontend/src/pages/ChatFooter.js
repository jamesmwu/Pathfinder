import React, { useState } from 'react';
import "../styles/chatTab.css";

const ChatFooter = ({ socket, chatId, recipientId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // console.log(message);
      // console.log(chatId);
      socket.emit("private message", { content: message, roomId: chatId, recipientId: recipientId});
    }
    setMessage("");
  };
  return (
    <div className='chat-bar'>
      <form className='form' onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder='Write message'
          className='message'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;