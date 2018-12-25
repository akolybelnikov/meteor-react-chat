import React from "react";
import { Link } from "react-router-dom";
import { CurrentContextConsumer } from "./contexts";

export default () => (
  <nav className="navbar is-primary is-fixed-bottom tool-bar">
    <div className="level is-mobile" style={{ height: "3.25rem" }}>
      <div className="level-item has-text-centered">
        <CurrentContextConsumer>
          {({ actions }) => {
            return (
              <Link
                onClick={() => actions.switchState("users")}
                className="has-text-dark"
                to="/"
              >
                Users
              </Link>
            );
          }}
        </CurrentContextConsumer>
      </div>
      <div className="level-item has-text-centered">
        <CurrentContextConsumer>
          {({ actions }) => {
            return (
              <Link
                onClick={() => actions.switchState("chats")}
                className="has-text-dark"
                to="/"
              >
                Chats
              </Link>
            );
          }}
        </CurrentContextConsumer>
      </div>
    </div>
  </nav>
);
