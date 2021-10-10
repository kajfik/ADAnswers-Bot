"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "xd",
    number: 7,
    description: "explains the xd channel",
    check: true,
    sent: [`The XD channel (<#440613243107409930>) is a joke channel that only testers, moderators, and developers can chat in. This channel is purely for fun and serves no functional purpose.`],
  }),
};