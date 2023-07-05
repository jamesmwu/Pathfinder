import React from "react";
import "../styles/chatTab.css";

export default function ChatTab({ mentor }) {

    if (mentor === undefined || mentor === null || mentor === "") {
        return (
            <div>
                <h2>Select a mentor from the Chats tab to start talking!</h2>
            </div>
        );
    }

    return (
        <div className="chat-tab">
            <div className="chat-content">
                Chat with {mentor} here, gotta pass the text data :p
            </div>
            <div className="chat-bar">
                <input type="text" placeholder="Type your message..." />
                <button>Send</button>
            </div>
        </div>
    );
}
