import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { Chats } from "../api/chats";
import { withRouter } from "react-router-dom";

const ChatItem = ({ person, history, chats }) => {
  onGoToChat = () => {
    if (chats.length) {
      history.push(`/chats/${chats[0]._id}`);
    } else {
      Meteor.call("chats.insert", person, function(_, result) {
        history.push(`/chats/${result}`);
      });
    }
  };
  return (
    <article
      className="media has-background-white-bis"
      style={{ alignItems: "center", paddingTop: "0px", borderTop: "none" }}
    >
      <figure className="media-left">
        <p className="image is-64x64">
          <img
            src={
              person.avatar
                ? person.avatar
                : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnklEQVR42u3RQREAAAQAMIJ5yqW6Gs5tFZbVNcEZKUQIQoQgRAhChCBEiBAhCBGCECEIEYIQIQhBiBCECEGIEIQIQQhChCBECEKEIEQIQhAiBCFCECIEIUIQghAhCBGCECEIEYIQhAhBiBCECEGIEIQgRAhChCBECEKEIAQhQhAiBCFCECIEIQgRghAhCBGCECEIESJECEKEIEQIQr5bjMB8nahrFBcAAAAASUVORK5CYII="
            }
          />
        </p>
      </figure>
      <div className="media-content">
        <div className="field">
          <p className="control">{person.username}</p>
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

export default withTracker(({ person }) => {
  Meteor.subscribe("chats");

  return {
    chats: Chats.find({
      $and: [{ user: { $eq: person._id } }]
    }).fetch()
  };
})(withRouter(ChatItem));
