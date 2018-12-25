import React from "react";
import {CurrentContextProvider, CurrentContextConsumer} from './contexts'

export default class Main extends React.Component {
  state = {
    activeState: "chats"
  };

  render() {
    return (
      <React.Fragment>
        <CurrentContextProvider
          value={{
            activeState: this.state.activeState,
            actions: {
              switchState: newState => {
                this.setState({
                  activeState: newState
                });
              }
            }
          }}
        >
          {this.props.children}
        </CurrentContextProvider>
      </React.Fragment>
    );
  }
}

export const Section = ({isActive, children}) => {
    return (
        <CurrentContextConsumer>
            {({activeState}) => {
                activeState === isActive ? children : null
            }}
        </CurrentContextConsumer>
    )
}
