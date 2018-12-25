import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import "/imports/startup/accounts-config";
import { renderRoutes } from '/imports/ui/Routes';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById("react-target"));
});
