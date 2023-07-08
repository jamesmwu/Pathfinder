import React from 'react';
import "../styles/chatBody.css";

const ChatBody = ({ messages, user }) => {
    return (
        <div className="chat-content">
            {messages.map((message) =>
                message.sender === user._id ? (
                    <div key={message._id} className="message__chats">
                        <div className="message__sender">
                            <p>{message.body}</p>
                        </div>
                    </div>
                ) : (
                    <div key={message._id} className="message__chats">
                        <div className="message__recipient">
                            <p>{message.body}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default ChatBody;