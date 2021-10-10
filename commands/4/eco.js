/* eslint-disable max-len */
"use strict";

const { TimeStudyApplicationCommand } = require("../../classes/ApplicationCommand/TimeStudyApplicationCommand");
const EternityChallengeOrder = require("./eternitychallengeorder");

module.exports = {
  command: new TimeStudyApplicationCommand({
    name: "eco",
    number: 3,
    description: EternityChallengeOrder.command.description,
    type: "shorthand",
    check: EternityChallengeOrder.command.check,
    sent: EternityChallengeOrder.command.sent,
    acceptableArgs: EternityChallengeOrder.command.acceptableArgs,
    getArgMessage(arg) {
      return EternityChallengeOrder.command.getArgMessage(arg);
    },
    argInfo: {
      ec: { key: "ec", type: "number" },
      completion: { key: "completion", type: "number" },
    },
    epehemeral: true,
  })
};