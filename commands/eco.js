/* eslint-disable max-len */
"use strict";

const { EternityChallengeOrderCommand } = require("../classes/EternityChallengeOrderCommand");
const EternityChallengeOrder = require("./eternitychallengeorder");

module.exports = {
  command: new EternityChallengeOrderCommand({
    name: "eco",
    number: EternityChallengeOrder.command.number,
    description: EternityChallengeOrder.command.description,
    type: "shorthand",
    check: EternityChallengeOrder.command.check,
    sent: EternityChallengeOrder.command.sent,
    acceptableArgs: EternityChallengeOrder.command.acceptableArgs,
    getArgMessage(arg) {
      return EternityChallengeOrder.command.getArgMessage(arg);
    }
  })
};