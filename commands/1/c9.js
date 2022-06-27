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
      return ChallengeCommand.command.getArgMessage("c9", "strategy");
    },
    sent: [ChallengeCommand.command.getArgMessage("c9", "strategy")],
  })
};