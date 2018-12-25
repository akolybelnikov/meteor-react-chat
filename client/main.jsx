import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import "/imports/startup/accounts-config";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "/imports/ui/App";

Meteor.startup(() => {
  render(
    <Router>
      <Route component={App} />
    </Router>,
    document.getElementById("react-target")
  );
});
