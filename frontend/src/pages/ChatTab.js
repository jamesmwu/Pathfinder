import React, { useEffect, useRef } from "react";
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import "../styles/chatTab.css";

//setConnection updates the connections array, not curSelectedConnection
export default function ChatTab({ connection, connectionsArray, setConnection, user, socket, scrollToBottom }) {
    const chatContentRef = useRef(null);
    const isScrolledToBottomRef = useRef(true);

    const handleUpdate = () => {
        let arr = [];
        for (let i = 0; i < connectionsArray.length; i++) {
            //Push connection if the chat is the one that equals the current
            if (connectionsArray[i].chat._id === connection.chat._id) {
                let updated = { ...connectionsArray[i] };
                updated.newMessage = false;
                arr.push(updated);
            }
            else {
                arr.push(connectionsArray[i]);
            }
        }
        setConnection(arr);
    };

    useEffect(() => {
        socket.emit("read message", { roomId: connection.chat._id });
        console.log("HELLO");
        connection.newMessage = false;  //Updates curSelectedConnection
        handleUpdate(); //Updates connections array
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
