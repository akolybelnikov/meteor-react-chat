import React from "react";
import Dots from "./SVG/three-dots";
import { withTracker } from "meteor/react-meteor-data";
import { Users } from "../api/users";

const Indicator = props => {
  const { users } = props;
  return (
    <React.Fragment>
      {users.length && users[0].typing && (
        <div className="indicator">
          <p className="tag is-info typing-tag">
            <span style={{ marginRight: "5px" }}>
              {users.length && users[0].username}
            </span>
            <span>
              is typing <Dots fill="#00d1b2"/>
            </span>
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

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
})(Indicator);
