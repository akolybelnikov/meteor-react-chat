import React from "react";
import AccountsUiWrapper from "./AccountsUiWrapper";

export default ({ currentUser }) => (
  <nav className="navbar is-primary is-fixed-top tool-bar">
    <div className="navbar-brand">
      <div
        className="navbar-item has-text-dark"
        style={{ flex: `1 1 auto`, justifyContent: "flex-end" }}
      >
        {currentUser && <span style={{ marginRight: `5px` }}>Hello, </span>}
        <AccountsUiWrapper />
        {!currentUser && (
          <span style={{ marginLeft: `5px` }}>to join the chat </span>
        )}
      </div>
    </div>
  </nav>
);
