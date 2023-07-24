import React, { useState } from 'react';
import "../styles/chatFooter.css";


const ChatFooter = ({ socket, chatId, recipientId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // console.log(recipientId);
      socket.emit("private message", { content: message, roomId: chatId, recipientId: recipientId });
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