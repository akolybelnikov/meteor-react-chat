import React from "react";
import {withRouter} from 'react-router-dom'
import Avatar from './AvatarMock'
const ChatItem = ({ chat, history }) => {
  onGoToChat = () => history.push(`/chats/${chat._id}`);
  return (
    <article
      className="media has-background-white-bis"
      style={{ alignItems: "center", paddingTop: "0px", borderTop: "none" }}
    >
      <Avatar name={"media-left"}/>
      <div className="media-content">
        <div className="field">
          <p className="control">{chat.username}</p>
        </div>
      </div>
      <div style={{ margin: "0 1rem" }} className="media-right">
        <button onClick={onGoToChat} className="button is-primary is-outlined">
          <span className="icon">
            <i className="fas fa-arrow-right" />
          </span>
        </button>
      </div>
    </article>
  );
};

export default withRouter(ChatItem);
