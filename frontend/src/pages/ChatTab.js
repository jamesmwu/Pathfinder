import React from "react";
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import "../styles/chatTab.css";

export default function ChatTab({ connection, user, socket }) {
    // const lastMessageRef = useRef(null);

    /*
    useEffect(() => {
    //scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);
    */


    if (connection === undefined || connection === null || connection.mentor._id === "") {

        return (
            <div>
                <h2>Connect with a mentor to chat with them!</h2>
            </div>
        );
    }
    return (
        <div className="chat-tab">
            <ChatBody messages={connection.chat.messages} user={user} />
            <ChatFooter socket={socket} chatId={connection.chat._id} />
        </div>
    );
}
