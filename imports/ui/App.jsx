import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { Chats } from "../api/chats";
import { Messages } from "../api/messages";
import { Users } from "../api/users";
import ChatItem from "./ChatItem";
import Footer from "./Footer";
import Header from "./Header";
import Grid from "./SVG/grid";

class App extends React.Component {
  render() {
    const { currentUser, users } = this.props;
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
          <main className="section chat-items">
            <div className="chat-items-holder">
              {users &&
                users.map(user => <ChatItem key={user._id} person={user} />)}
            </div>
          </main>
        )}
        <Footer />
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
