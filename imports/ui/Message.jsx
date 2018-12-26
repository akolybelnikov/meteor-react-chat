import React from "react";
import { Meteor } from "meteor/meteor";

export default props => {
  const { text, username, checked } = props;

  return (
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
          <i class="fas fa-check" aria-hidden="true" />
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
  );
};
