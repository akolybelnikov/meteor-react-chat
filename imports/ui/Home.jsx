import React from "react";
import ChatItem from "./ChatItem";
import UserItem from "./UserItem";

export default ({ activeState, chats, users }) => {
  return (
    <React.Fragment>
      {activeState === "chats" && (
        <main className="section chat-items">
          <div className="chat-items-holder">
            {chats &&
              chats.map(chat => <ChatItem key={chat._id} chat={chat} />)}
          </div>
        </main>
      )}

      {activeState === "users" && (
        <main className="section user-items">
          <div className="user-items-holder">
            {users &&
              users.map(user => <UserItem key={user._id} user={user} />)}
          </div>
        </main>
      )}
    </React.Fragment>
  );
};
