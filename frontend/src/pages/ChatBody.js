import React from 'react'
import "../styles/chatTab.css";

const ChatBody = ({messages, user}) => {
  return (
    <>
        <div className="chat-content">
            {messages.map((message) =>
            message.sender === user._id? (
                <div className="message__chats" key={message._id}>
                <div className="message__sender">
                    <p>{message.body}</p>
                </div>
                </div>
            ) : (
                <div className="message__chats" key={message._id}>
                <div className="message__recipient">
                    <p>{message.body}</p>
                </div>
                </div>
            )
        )}   
        </div>
    </>
  )
}

export default ChatBody