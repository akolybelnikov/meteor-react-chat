import { Form, Text, withFormApi } from "informed";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { Element, Events, scroller } from "react-scroll";
import { Messages } from "../api/messages";
import AccountsUiWrapper from "./AccountsUiWrapper";
import Message from "./Message";

class App extends React.Component {
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
  };

  resetForm = state => {
    state.reset();
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

  render() {
    const { messages, currentUser } = this.props;
    return (
      <main className="section chat-container">
        <div className="container">
          <nav className="navbar is-primary is-fixed-top">
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
              style={{
                padding: `0 .5rem`,
                left: `1%`,
                width: `98%`,
                position: `fixed`,
                bottom: 0,
                zIndex: 10
              }}
            >
              <Form onSubmit={this.onSubmitMessage}>
                <FormTemplate clearForm={this.resetForm}>
                  <div className="control has-icons-left is-expanded">
                    <Text
                      className="input is-large is-primary"
                      field="text"
                      type="text"
                    />
                    <span className="icon is-large is-left has-text-primary">
                      <i className="fas fa-comment" />
                    </span>
                  </div>{" "}
                   
                </FormTemplate>
              </Form>
            </div>
          )}
          <Element id="scroll-container">
            <Element id="scroll-top">
              <p
                style={{ padding: `1rem 1rem 0` }}
                className="subtitle has-text-primary"
              >
                Beginning of the conversation:
              </p>
            </Element>
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
            </div>
          </Element>
        </div>
      </main>
    );
  }
}

const ComposeMessage = props => {
  const { clearForm, formApi } = props;
  resetForm = () => {
    clearForm(formApi);
  };
  return <div className="field">{props.children}</div>;
};

const FormTemplate = withFormApi(ComposeMessage);

export default withTracker(() => {
  Meteor.subscribe("messages");

  return {
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(App);
