import createBrowserHistory from "history/createBrowserHistory";
import React from "react";
import { Route, Router, Switch } from "react-router";
import Chat from "./Chat";
import App from './App'

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/chats/:id" component={Chat} />
    </Switch>
  </Router>
);
