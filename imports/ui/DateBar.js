import React from "react";
import Moment from "react-moment";

export default () => (
  <p style={{width: '40%'}} className="tag is-info">
    <Moment date={new Date()} format="DD/MM" />
  </p>
);
