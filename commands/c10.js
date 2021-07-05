"use strict";

const { Command } = require("../classes/Command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new Command({
    number: 7,
    name: "c10",
    description: "shorthand for `++challenge c10`",
    type: "shorthand",
    check: "earlyInfinity",
    sent: [ChallengeCommand.command.getArgMessage("c10")],
    acceptableArgs: undefined
  })
};