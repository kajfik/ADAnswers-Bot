"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new ApplicationCommand({
    number: 7,
    name: "c9",
    description: "shorthand for `++challenge c9`",
    type: "shorthand",
    check: "earlyInfinity",
    sent: [ChallengeCommand.command.getArgMessage(["c9"])],
  })
};