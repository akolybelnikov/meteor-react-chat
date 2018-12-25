import { Form, Text, withFormApi } from "informed";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { Element, Events, scroller } from "react-scroll";
import { Messages } from "../api/messages";
import { Users } from "../api/users";
import AccountsUiWrapper from "./AccountsUiWrapper";
import Indicator from "./Indicator";
import Message from "./Message";
import DateBar from './DateBar'

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

  onSubmitMessage = ({ text }) => {
    Meteor.call("messages.insert", text);
    this.scrollToWithContainer();
    resetForm();
    Meteor.call("users.setState", false);
  };

  setStateTyping = () => {
    Meteor.call("users.setState", true);
  };

  setStateNotTyping = e => {
    if (!e.target.value) {
      Meteor.call("users.setState", false);
    }
  };

  resetForm = form => {
    form.reset();
  };

  scrollToWithContainer = () => {
    let goToContainer = new Promise((resolve, reject) => {
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
    let goToContainer = new Promise((resolve, reject) => {
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
    let goToContainer = new Promise((resolve, reject) => {
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
    console.log(this.props);
    return (
      <main className="section chat-container">
        <div className="container">
          <nav className="navbar is-primary is-fixed-top tool-bar">
            <div
              className="navbar-brand"
              style={{ justifyContent: `space-between` }}
            >
              <div className="navbar-item" style={{ flex: `1 1 50%` }}>
                <p className="subtitle has-text-dark">Welcome to Simply Chat</p>
              </div>
              <div
                className="navbar-item has-text-dark is-hidden-desktop"
                style={{ flex: `1 1 auto`, justifyContent: "flex-end" }}
              >
                {currentUser && (
                  <span style={{ marginRight: `5px` }}>Hello, </span>
                )}
                <AccountsUiWrapper />
                {!currentUser && (
                  <span style={{ marginLeft: `5px` }}>to join the chat </span>
                )}
              </div>
            </div>
            <div className="navbar-menu">
              <div
                className="navbar-item has-text-dark is-hidden-touch"
                style={{ flex: `1 1 auto`, justifyContent: "flex-end" }}
              >
                {currentUser && (
                  <span style={{ marginRight: `5px` }}>Hello, </span>
                )}
                <AccountsUiWrapper />
                {!currentUser && (
                  <span style={{ marginLeft: `5px` }}>to join the chat </span>
                )}
              </div>
            </div>
          </nav>

          {currentUser && (
            <div
              className="tool-bar"
              style={{
                padding: `0 .5rem`,
                position: `fixed`,
                bottom: 0,
                zIndex: 10
              }}
            >
              <Form onSubmit={this.onSubmitMessage}>
                <FieldTemplate
                  clearForm={this.resetForm}
                  getState={this.setStateNotTyping}
                >
                  <div className="control has-icons-left is-expanded">
                    <Text
                      className="input is-large is-primary"
                      field="text"
                      type="text"
                      onValueChange={this.setStateTyping}
                      onBlur={this.setStateNotTyping}
                    />
                    <span className="icon is-large is-left has-text-primary">
                      <i className="fas fa-comment" />
                    </span>
                  </div>{" "}
                   
                </FieldTemplate>
              </Form>
            </div>
          )}
          <Element id="scroll-container">
            <Element id="scroll-top"><DateBar /></Element>
            <div style={{ padding: `1rem 1rem 2rem`, position: "relative" }}>
              {messages && this.renderMessages(messages)}
              <a
                id="button-to-top"
                onClick={this.scrollToTopWithContainer}
                className="button is-primary"
              >
                <span className="icon is-large">
                  <i className="fas fa-arrow-up fa-2x" />
                </span>
              </a>
              <div id="typing-alert">
                {users &&
                  users.map(user => (
                    <Indicator key={user._id} username={user.username} />
                  ))}
              </div>
            </div>
            <Element id="scroll-bottom" />
          </Element>
        </div>
      </main>
    );
  }
}

const ComposeMessage = props => {
  const { clearForm, formApi, getState } = props;
  resetForm = () => {
    clearForm(formApi);
  };
  setStateNotTyping = () => {
    getState(formApi);
  };

  return <div className="field">{props.children}</div>;
};

const FieldTemplate = withFormApi(ComposeMessage);

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
