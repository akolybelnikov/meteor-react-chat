import React from "react";
import Moment from "react-moment";

export default () => (
  <p style={{width: '100px', padding: '1rem'}} className="tag is-info">
    <Moment date={new Date()} format="DD/MM" />
  </p>
);
