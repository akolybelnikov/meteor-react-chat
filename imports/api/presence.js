import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Presences = Meteor.presences;

if (Meteor.isServer) {
  Meteor.publish("userPresence", function presencePublication() {
    const filter = {}
    return Presences.find({});
  });
}