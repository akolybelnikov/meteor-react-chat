import React from "react";
import { Link } from "react-router-dom";

export default ({users, chats}) => (
  <nav className="navbar is-primary is-fixed-bottom tool-bar">
    <div className="level is-mobile" style={{ height: "3.25rem" }}>
      <div className="level-item has-text-centered">
        <Link
          onClick={users}
          className="has-text-dark"
          to="/"
        >
          Users
        </Link>
      </div>
      <div className="level-item has-text-centered">
        <Link
          onClick={chats}
          className="has-text-dark"
          to="/"
        >
          Chats
        </Link>
      </div>
    </div>
  </nav>
);
