import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { withRouter } from "react-router-dom";
import { Chats } from "../api/chats";
import Avatar from "./AvatarMock";

const ChatItem = ({ chats, history, user }) => {
  onGoToChat = () => {
    if (chats.length) {
      history.push(`/chats/${chats[0]._id}`);
    } else {
      Meteor.call("chats.insert", user, function(_, result) {
        history.push(`/chats/${result}`);
      });
    }
  };

  return (
    <article
      className="media has-background-white-bis"
      style={{
        alignItems: "center",
        paddingTop: "0px",
        borderTop: "none",
        marginTop: "0.2rem"
      }}
    >
      <Avatar name={"media-left"} />
      <div className="media-content">
        <div className="field">
          <p className="control">{user.username}</p>
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

export default withTracker(({ user }) => {
  Meteor.subscribe("users");
  return {
    chats: Chats.find({
      $or: [
        {
          $and: [
            { user: { $eq: user._id } },
            { owner: { $eq: Meteor.userId() } }
          ]
        },
        {
          $and: [
            { owner: { $eq: user._id } },
            { user: { $eq: Meteor.userId() } }
          ]
        }
      ]
    }).fetch()
  };
})(withRouter(ChatItem));
