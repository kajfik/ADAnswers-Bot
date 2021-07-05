"use strict";

const { Command } = require("../classes/Command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new Command({
    number: 7,
    name: "c9",
    description: "shorthand for `++challenge c9`",
    type: "shorthand",
    check: "earlyInfinity",
    sent: [ChallengeCommand.command.getArgMessage("c9")],
    acceptableArgs: undefined
  })
};