import React from "react";
import Moment from "react-moment";

export default props => {
  const { text, date, user } = props;
  return (
    <p>
      <span>
        <Moment date={date} format="hh:mm:ss a:" />{" "}
      </span>
      {user && <span style={{ marginRight: `10px` }}>{user}></span>}
      <span>{text}</span>
    </p>
  );
};
