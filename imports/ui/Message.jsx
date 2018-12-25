import React from "react";
import Moment from "react-moment";

export default props => {
  const { text, date, user } = props;
  return (
    <div>
      <span className="tag is-light">
        <Moment date={date} format="hh:mm a" />{" "}
      </span>
      {user && (
        <span className="tag is-light" style={{ marginLeft: `10px` }}>
          {user}
        </span>
      )}
      <div
        className="content has-text-black-ter chat-text"
      >
        <p className="has-background-white-bis">{text}</p>
      </div>
    </div>
  );
};
