import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { withRouter } from "react-router-dom";
import { Users } from "../api/users";
import Avatar from "./AvatarMock";

const ChatItem = ({ chat, history, users }) => {
  onGoToChat = () => history.push(`/chats/${chat._id}`);
  return (
    <article
      className="media has-background-white-bis"
      style={{ alignItems: "center", paddingTop: "0px", borderTop: "none" }}
    >
      <Avatar name={"media-left"} />
      <div className="media-content">
        <div className="field">
          <p className="control">{users[0].username}</p>
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

export default withTracker(({ chat }) => {
  Meteor.subscribe("users");
  return {
    currentUser: Meteor.user(),
    users: Users.find({
      $or: [
        {
          $and: [{ _id: { $eq: chat.user } }, { _id: { $ne: Meteor.userId() } }]
        },
        {
          $and: [
            { _id: { $eq: chat.owner } },
            { _id: { $ne: Meteor.userId() } }
          ]
        }
      ]
    }).fetch()
  };
})(withRouter(ChatItem));
