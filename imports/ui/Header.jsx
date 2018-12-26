import React from "react";
import AccountsUiWrapper from "./AccountsUiWrapper";
import GoBackArrow from "./GoBackArrow";
import { withRouter } from "react-router-dom";

const Header = ({ currentUser, location }) => (
  <nav className="navbar is-primary is-fixed-top tool-bar">
    <div className="navbar-brand">
      {location.pathname !== "/" && (
        <div className="navbar-item">
          <GoBackArrow />
        </div>
      )}
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

export default withRouter(Header);
