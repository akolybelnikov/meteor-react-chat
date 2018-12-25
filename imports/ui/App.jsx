import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { Chats } from "../api/chats";
import { Messages } from "../api/messages";
import { Users } from "../api/users";
import Footer from "./Footer";
import Header from "./Header";
import Grid from "./SVG/grid";

import Routes from "./Routes";

class App extends React.Component {
  state = {
    activeState: "chats"
  };
  render() {
    const { currentUser, users, chats } = this.props;
    const childProps = {
      activeState: this.state.activeState,
      users: users,
      chats: chats
    };
    return (
      <React.Fragment>
        <Header currentUser={currentUser} />
        {!currentUser && (
          <div id="grid">
            <div className="fill-in" />
            <Grid />
            <h2 className="title has-text-primary">Simply Chat</h2>
          </div>
        )}
        {currentUser && (
          <React.Fragment>
            <Routes childProps={childProps} />
            <Footer
              users={() => this.setState({ activeState: "users" })}
              chats={() => this.setState({ activeState: "chats" })}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("messages");
  Meteor.subscribe("users");
  Meteor.subscribe("chats");

  return {
    chats: Chats.find({}).fetch(),
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user(),
    users: Users.find({
      $and: [{ _id: { $ne: Meteor.userId() } }]
    }).fetch()
  };
})(App);
