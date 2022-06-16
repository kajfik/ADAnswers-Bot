/* eslint-disable max-len */
"use strict";

const { ChallengeApplicationCommand } = require("../../classes/ApplicationCommand/ChallengeApplicationCommand");
const ChallengeCommand = require("../5/challenge");

module.exports = {
  command: new ChallengeApplicationCommand({

    name: "ic5",
    description: "shorthand for `/challenge ic5`",
    type: "shorthand",
    check: "weirdICsCheck",
    getArgMessage() {
      return ChallengeCommand.command.getArgMessage("ic5", "strategy");
    },
    sent: [ChallengeCommand.command.getArgMessage("ic5", "strategy")],
  })
};
