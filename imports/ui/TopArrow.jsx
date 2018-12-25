import React from "react";

export default ({ scrollToTopWithContainer }) => {
  return (
    <a
      id="button-to-top"
      onClick={scrollToTopWithContainer}
      className="button is-primary"
    >
      <span className="icon is-large">
        <i className="fas fa-arrow-up fa-2x" />
      </span>
    </a>
  );
};
