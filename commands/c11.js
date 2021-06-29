"use strict";

const { classes } = require("../command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new classes.com({
    number: 7,
    name: "c11",
    description: "shorthand for `++challenge c11`",
    type: "shorthand",
    check: "earlyInfinity",
    sent: [ChallengeCommand.command.getArgMessage("c11")],
    acceptableArgs: undefined
  })
};