import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { withRouter } from "react-router-dom";
import { Chats } from "../api/chats";

const UserItem = ({ user, chats, history }) => {
  onGoToChat = () => {
    if (chats.length) {
      history.push(`/chats/${chats[0]._id}`);
    } else {
      Meteor.call("chats.insert", user, function(_, result) {
        history.push(`/chats/${result}`);
      });
    }
  };
  return <div />;
};

export default withTracker(({ user }) => {
  Meteor.subscribe("chats");

  return {
    chats: Chats.find({
      $and: [{ user: { $eq: user._id } }]
    }).fetch()
  };
})(withRouter(UserItem));
