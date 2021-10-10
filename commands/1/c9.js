"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");
const ChallengeCommand = require("../5/challenge");

module.exports = {
  command: new ApplicationCommand({
    number: 7,
    name: "c9",
    description: "shorthand for `/challenge c9`",
    type: "shorthand",
    check: "earlyInfinityCheck",
    sent: [ChallengeCommand.command.messageObject.c9],
  })
};