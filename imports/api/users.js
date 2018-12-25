import { Meteor } from "meteor/meteor";

export const Users = Meteor.users;

if (Meteor.isServer) {
  Meteor.publish("users", function usersPublication() {
    return Users.find();
  });
}

Meteor.methods({
  "users.setState"(state) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Users.update(this.userId, { $set: { typing: state } });
  }
});
