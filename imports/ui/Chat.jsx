import { withTracker } from "meteor/react-meteor-data";
import React from "react";
import { withRouter } from "react-router-dom";
import { Element, Events, scroller } from "react-scroll";
import { Chats } from "../api/chats";
import { Messages } from "../api/messages";
import Indicator from "./Indicator";
import InputBar from "./InputBar";
import Message from "./Message";
import TopArrow from "./TopArrow";

class Chat extends React.Component {
  componentDidMount() {
    setTimeout(() => this.scrollToBttmWithContainer(), 500);
    Meteor.call("users.setState", false);
    console.log(this.props.location)
  }

  renderMessages = messages => {
    return messages.map((msg, index) => (
      <Message key={index} text={msg.text} username={msg.username} checked={msg.checked} />
    ));
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
    const { messages, chats } = this.props;

    return (
      <React.Fragment>
        <section className="section chat-container">
          <div className="container">
            <div id="typing-alert">
              {chats.length && <Indicator chat={chats[0]} />}
            </div>
            <InputBar
              scroll={this.scrollToBttmWithContainer}
              chat={this.props.location.pathname.split("/")[2]}
            />
            <Element id="scroll-container">
              <Element style={{ padding: "1rem" }} id="scroll-top" />
              <div style={{ padding: `1rem 1rem 6rem`, position: "relative" }}>
                {messages && this.renderMessages(messages)}
              </div>
              <Element id="scroll-bottom" />
            </Element>

            <TopArrow
              scrollToTopWithContainer={this.scrollToTopWithContainer}
            />
          </div>
        </section>
        )
      </React.Fragment>
    );
  }
}

export default withTracker(({ location }) => {
  Meteor.subscribe("messages");
  Meteor.subscribe("chats");

  return {
    messages: Messages.find({
      chat: { $eq: location.pathname.split("/")[2] }
    }).fetch(),
    chats: Chats.find({
      _id: { $eq: location.pathname.split("/")[2] }
    }).fetch()
  };
})(withRouter(Chat));
