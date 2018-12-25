import React from "react";
import { Switch } from "react-router";
import Chat from "./Chat";
import Home from "./Home";
import RouteWithProps from "./RouteWithProps";

export default ({ childProps }) => (
  <Switch>
    <RouteWithProps exact path="/" component={Home} props={childProps} />
    <RouteWithProps
      exact
      path="/chats/:id"
      component={Chat}
      props={childProps}
    />
  </Switch>
);
