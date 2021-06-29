"use strict";

const { classes } = require("../command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new classes.com({
    number: 7,
    name: "c8",
    description: "shorthand for `++challenge c8`",
    type: "shorthand",
    check: "earlyInfinity",
    sent: [ChallengeCommand.command.getArgMessage("c8")],
    acceptableArgs: undefined
  })
};