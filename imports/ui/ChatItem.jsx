import React from "react";
import {withRouter} from 'react-router-dom'

const ChatItem = ({ chat, history }) => {
  onGoToChat = () => history.push(`/chats/${chat._id}`);
  return (
    <article
      className="media has-background-white-bis"
      style={{ alignItems: "center", paddingTop: "0px", borderTop: "none" }}
    >
      <figure className="media-left">
        <p className="image is-64x64">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnklEQVR42u3RQREAAAQAMIJ5yqW6Gs5tFZbVNcEZKUQIQoQgRAhChCBEiBAhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQgRAhChCBECEKEIAQhQhAiBCFCECIEIQgRghAhCBGCECEIESJECEKEIEQIQr5bjMB8nahrFBcAAAAASUVORK5CYII=" />
        </p>
      </figure>
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
