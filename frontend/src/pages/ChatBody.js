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


    if (messages === undefined || messages === null || messages.length === 0) {
        return (
            <div className="chat-content" ref={chatContentRef}>
                <h2>Send a message to get the conversation going!</h2>
                <div className='prompts'>
                    <h3>Potential ideas to get you started:</h3>
                    <ol>
                        <li>An intro about yourself, your background, and why you're interested in this field.</li>
                        <li>Is there anything about their background you'd like to hear more about? Perhaps a position they hold, a school they go to, or something else?</li>
                        <li>You can ask your connection about the steps they took to get to where they were, and what they think might be helpful for you to do in your position.</li>
                        <li>Maybe you noticed something in their description that you guys have in common! Feel free to bring it up! After all, mentors are normal people just like you. Each of us are happy to help, and we want to hear all the interesting things about YOU!</li>
                    </ol>
                </div>
                <br />Have fun! <br />:)
            </div>
        );
    }

    return (
        <div className="chat-content" ref={chatContentRef}>
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
            <div ref={lastMessageRef} />
        </div>
    );
};

export default ChatBody;
