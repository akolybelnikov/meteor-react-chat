import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Messages = new Mongo.Collection("messages");

if (Meteor.isServer) {
  Meteor.publish("messages", function msgsPublication() {
    return Messages.find();
  });
}

Meteor.methods({
  "messages.insert"(text, chat) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Messages.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      chat,
      username: Meteor.users.findOne(this.userId).username,
      checked: false
    });
  },
  "messages.markAsRead"(id) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Messages.update(id, { $set: { checked: true } });
  }
});
