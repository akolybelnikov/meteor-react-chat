import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { Element, Events, scroller } from "react-scroll";
import { Messages } from "../api/messages";
import { Users } from "../api/users";
import DateBar from "./DateBar";
import Header from "./Header";
import Indicator from "./Indicator";
import InputBar from "./InputBar";
import Message from "./Message";
import TopArrow from "./TopArrow";
import Grid from "./SVG/grid";

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => this.scrollToBttmWithContainer(), 500);
    Meteor.call("users.setState", false);
  }

  renderMessages = messages => {
    return messages.map((msg, index) => (
      <Element key={index} id={`message-${index}`}>
        <Message text={msg.text} date={msg.createdAt} user={msg.username} />
      </Element>
    ));
  };

  scrollToWithContainer = () => {
    goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register("end", () => {
        resolve();
        Events.scrollEvent.remove("end");
      });

      scroller.scrollTo("scroll-container");
    });
    goToContainer.then(() =>
      scroller.scrollTo(`message-${this.props.messages.length - 1}`, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "scroll-container"
      })
    );
  };

  scrollToTopWithContainer = () => {
    goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register("end", () => {
        resolve();
        Events.scrollEvent.remove("end");
      });

      scroller.scrollTo("scroll-container");
    });
    goToContainer.then(() =>
      scroller.scrollTo(`scroll-top`, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "scroll-container"
      })
    );
  };

  scrollToBttmWithContainer = () => {
    goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register("end", () => {
        resolve();
        Events.scrollEvent.remove("end");
      });

      scroller.scrollTo("scroll-container");
    });
    goToContainer.then(() =>
      scroller.scrollTo(`scroll-bottom`, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        containerId: "scroll-container"
      })
    );
  };

  render() {
    const { messages, currentUser, users } = this.props;
    return (
      <React.Fragment>
        <Header currentUser={currentUser} />
        {!currentUser && (
          <div id="grid">
            <Grid />
            <h2 className="title has-text-primary" style={{marginBlockStart: '30px'}}>Simply Chat</h2>
          </div>
        )}ˀ
        {currentUser && (
          <main className="section chat-container">
            <div className="container">
              <InputBar scrollToWithContainer={this.scrollToWithContainer} />
              <Element id="scroll-container">
                <Element style={{ padding: "1rem" }} id="scroll-top">
                  <DateBar />
                </Element>
                <div
                  style={{ padding: `1rem 1rem 2rem`, position: "relative" }}
                >
                  {messages && this.renderMessages(messages)}
                </div>
                <Element id="scroll-bottom" />
              </Element>
              <div id="typing-alert">
                {users &&
                  users.map(user => (
                    <Indicator key={user._id} username={user.username} />
                  ))}
              </div>
              <TopArrow
                scrollToTopWithContainer={this.scrollToTopWithContainer}
              />
            </div>
          </main>
        )}
      </React.Fragment>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe("messages");
  Meteor.subscribe("users");

  return {
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user(),
    users: Users.find({
      $and: [{ typing: { $eq: true } }]
    }).fetch()
  };
})(App);
