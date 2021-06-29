"use strict";

const { classes } = require("../command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new classes.com({
    number: 7,
    name: "c3",
    description: "shorthand for `++challenge c3`",
    type: "shorthand",
    check: "earlyInfinity",
    sent: [ChallengeCommand.command.getArgMessage("c3")],
    acceptableArgs: undefined
  })
};
