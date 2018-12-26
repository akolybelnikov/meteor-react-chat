import React from "react";
import { Meteor } from "meteor/meteor";
import LazyLoad from "react-lazy-load";
import { withTracker } from "meteor/react-meteor-data";
import { Messages } from "../api/messages";

const Message = props => {
  const { text, username, checked, messages } = props;

  onMessageSeen = () => {
    if (messages[0].owner !== Meteor.userId() && !messages[0].checked) {
      Meteor.call("messages.markAsRead", messages[0]._id);
    }
  }

  return (
    <LazyLoad
      offsetVertical={10}
      onContentVisible={onMessageSeen}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent:
            username === Meteor.user().username ? "flex-end" : "start",
          marginBlockEnd: "3px"
        }}
      >
        {username === Meteor.user().username && checked && (
          <span className="icon has-text-primary">
            <i className="fas fa-check" aria-hidden="true" />
          </span>
        )}
        <p
          style={{
            maxWidth: "50%",
            wordBreak: "break-word",
            borderRadius: "5px",
            padding: "0.3rem"
          }}
          className={
            username === Meteor.user().username
              ? "has-background-light"
              : "has-background-grey-light"
          }
        >
          <span style={{ maxWidth: "50%" }}>{text}</span>
        </p>
      </div>
    </LazyLoad>
  );
};

export default withTracker(({ id }) => {
  Meteor.subscribe("messages");

  return {
    messages: Messages.find({
      _id: { $eq: id }
    }).fetch(),
  };
})(Message);
