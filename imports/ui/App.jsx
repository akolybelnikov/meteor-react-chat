import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { Chats } from "../api/chats";
import { Messages } from "../api/messages";
import { Users } from "../api/users";
import ErrorBoundary from "./Error";
import Header from "./Header";
import Routes from "./Routes";
import Grid from "./SVG/grid";

class App extends React.Component {
  render() {
    const { currentUser, users, chats } = this.props;
    const childProps = {
      users: users,
      chats: chats
    };
    return (
      <React.Fragment>
        <ErrorBoundary>
          <Header currentUser={currentUser} />
          {!currentUser && (
            <div className="grid">
              <div className="fill-in" />
              <Grid fill="#fff" />
              <h2 className="title has-text-primary">Simply Chat</h2>
            </div>
          )}
          {currentUser && (
            <React.Fragment>
              <Routes childProps={childProps} />
            </React.Fragment>
          )}
        </ErrorBoundary>
      </React.Fragment>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("messages");
  Meteor.subscribe("users");
  Meteor.subscribe("chats");

  return {
    chats: Chats.find({
      $or: [
        { owner: { $eq: Meteor.userId() } },
        { user: { $eq: Meteor.userId() } }
      ]
    }).fetch(),
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user(),
    users: Users.find({
      _id: { $ne: Meteor.userId() }
    }).fetch()
  };
})(App);
