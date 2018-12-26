import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <Link to="/" className="button is-primary">
      <span className="icon is-large">
        <i className="fas fa-arrow-circle-left fa-2x" />
      </span>
    </Link>
  );
};
