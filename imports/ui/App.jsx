import { Form, Text, withFormApi } from "informed";
import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { Messages } from "../api/messages";
import Message from "./Message";
import AccountsUiWrapper from "./AccountsUiWrapper";

const App = props => {
  const { messages, currentUser } = props;

  renderMessages = messages => {
    return messages.map((msg, index) => (
      <Message
        key={index}
        text={msg.text}
        date={msg.createdAt}
        user={msg.username}
      />
    ));
  };

  onSubmitMessage = ({ text }) => {
    Meteor.call("messages.insert", text);
    resetForm();
  };

  resetForm = state => {
    state.reset();
  };

  return (
    <main className="section">
      <div className="container">
        <nav className="navbar is-primary is-fixed-top">
          <div
            className="navbar-brand"
            style={{ justifyContent: `space-between` }}
          >
            <div className="navbar-item" style={{ flex: `1 1 50%` }}>
              <p className="subtitle has-text-dark">Welcome to Meteor Chat</p>
            </div>
            <div
              className="navbar-item has-text-dark"
              style={{ flex: `1 1 auto` }}
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
            <Form onSubmit={onSubmitMessage}>
              <FormTemplate clearForm={resetForm}>
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
        <section style={{ paddingTop: `1.5rem` }} className="section">
          <p className="is-size-6 has-text-primary">
            Beginning of the conversation:
          </p>
          {messages && renderMessages(messages)}
        </section>
      </div>
    </main>
  );
};

const ComposeMessage = props => {
  const { clearForm, formApi } = props;
  resetForm = () => {
    clearForm(formApi);
  };
  return <div className="field">{props.children}</div>;
};

const FormTemplate = withFormApi(ComposeMessage);

export default withTracker(() => {
  return {
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(App);
