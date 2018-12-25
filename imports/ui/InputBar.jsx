import { Form, Text, withFormApi } from "informed";
import React from "react";

const InputBar = ({ scrollToWithContainer }) => {
  onSubmitMessage = ({ text }) => {
    Meteor.call("messages.insert", text);
    scrollToWithContainer();
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

  return (
    <div
      className="tool-bar"
      style={{
        padding: `0 .5rem`,
        position: `fixed`,
        bottom: '3.75rem',
        zIndex: 10
      }}
    >
      <Form onSubmit={this.onSubmitMessage}>
        <FieldTemplate clearForm={resetForm} getState={setStateNotTyping}>
          <div className="control has-icons-left is-expanded">
            <Text
              className="input is-large is-primary"
              field="text"
              type="text"
              onValueChange={setStateTyping}
              onBlur={setStateNotTyping}
            />
            <span className="icon is-large is-left has-text-primary">
              <i className="fas fa-comment" />
            </span>
          </div>
        </FieldTemplate>
      </Form>
    </div>
  );
};

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

export default InputBar;
