import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Chats = new Mongo.Collection("chats");

if (Meteor.isServer) {
  Meteor.publish("chats", function mchatsPublication() {
    return Chats.find();
  });
}

Meteor.methods({
  "chats.insert"(user) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    return Chats.insert({
      user: user._id,
      createdAt: new Date(),
      owner: this.userId,

    });
  },
  "chats.remove"(chatId) {
    check(chatId, String);
    Chats.remove(chatId);
  }
});
