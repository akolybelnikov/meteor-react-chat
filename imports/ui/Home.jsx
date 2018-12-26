import React from "react";
import ChatItem from "./ChatItem";

export default ({ chats, users }) => {
  return (
    <main className="section chat-items">
      <div className="chat-items-holder">
        {users && users.map(user => <ChatItem key={user._id} user={user} />)}
      </div>
    </main>
  );
};
