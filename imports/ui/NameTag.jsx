import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { Users } from "../api/users";

const NameTag = ({ users }) => (
  <p className="tag is-primary name-tag">
    <span>{users.length && users[0].username}</span>
  </p>
);

export default withTracker(({ chat }) => {
  Meteor.subscribe("users");

  return {
    users: Users.find({
      $and: [
        { $or: [{ _id: { $eq: chat.user } }, { _id: { $eq: chat.owner } }] },
        { _id: { $ne: Meteor.userId() } }
      ]
    }).fetch()
  };
})(NameTag);
