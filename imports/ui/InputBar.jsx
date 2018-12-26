import { Form, Text, withFormApi } from "informed";
import React from "react";

const InputBar = ({ scroll, chat }) => {
  onSubmitMessage = ({ text }) => {
    if (text) {
      const message = text.trim();
      if (message !== "") {
        Meteor.call("messages.insert", message, chat);
      }
    }
    scroll();
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

  click = (e) => {
    console.log(e)
  }

  return (
    <div
      className="tool-bar"
      style={{
        padding: `0 .5rem`,
        position: `fixed`,
        bottom: "0.75rem",
        zIndex: 10
      }}
    >
      <Form onSubmit={this.onSubmitMessage}>
        <FieldTemplate clearForm={resetForm} getState={setStateNotTyping}>
          <div style={{flex: '1 1 auto'}} className="control has-icons-left has-icons-right is-expanded">
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
          <button
              style={{ cursor: "pointer", zIndex: 20 }}
              type="submit"
              className="is-large button is-primary"
            >
              <i className="fas fa-paper-plane" />
            </button>
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

  return <div className="field" style={{display: 'flex'}}>{props.children}</div>;
};

const FieldTemplate = withFormApi(ComposeMessage);

export default InputBar;
