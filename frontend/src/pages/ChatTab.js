import React, { useEffect, useRef } from "react";
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import "../styles/chatTab.css";

export default function ChatTab({ connection, user, socket, scrollToBottom }) {
    const chatContentRef = useRef(null);
    const isScrolledToBottomRef = useRef(true);

    useEffect(() => {
        socket.emit("read message", { roomId: connection.chat._id });
    }, []);

    useEffect(() => {
        // Scroll to the bottom when messages update
        if (chatContentRef.current !== null && isScrolledToBottomRef.current) {
            chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
        }
    }, [connection.chat.messages]);

    if (connection === undefined || connection === null || connection.mentor._id === "") {
        return (
            <div>
                <h2>Connect with a mentor to chat with them!</h2>
            </div>
        );
    }

    return (
        <div className="chat-tab">
            <ChatBody
                chatContentRef={chatContentRef}
                messages={connection.chat.messages}
                user={user}
                scrollToBottom={scrollToBottom}
            />
            <ChatFooter socket={socket} chatId={connection.chat._id} recipientId={connection.mentor._id} />
        </div>
    );
}
