import React, { useState } from 'react';
import "../styles/chatFooter.css";

const ChatFooter = ({ socket, chatId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("private message", { content: message, to: chatId });
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