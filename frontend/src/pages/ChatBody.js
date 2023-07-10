import React, { useEffect, useRef } from 'react';
import '../styles/chatBody.css';

const ChatBody = ({ messages, user, chatContentRef, scrollToBottom }) => {
    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
            scrollToBottom();
        }
    }, [messages, scrollToBottom]);

    return (
        <div className="chat-content" ref={chatContentRef}>
            {messages.map((message, index) =>
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
            <div ref={lastMessageRef} />
        </div>
    );
};

export default ChatBody;
