"use strict";

const { ChallengeApplicationCommand } = require("../../classes/ApplicationCommand/ChallengeApplicationCommand");
const ChallengeCommand = require("../5/challenge");

module.exports = {
  command: new ChallengeApplicationCommand({
    name: "c9",
    description: "shorthand for `/challenge c9`",
    type: "shorthand",
    check: "earlyInfinityCheck",
    getArgMessage() {
      return ChallengeCommand.command.messageObject.c9;
    },
    sent: [ChallengeCommand.command.messageObject.c9],
  })
};