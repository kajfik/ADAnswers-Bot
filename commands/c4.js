/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new classes.com({
    number: 7,
    name: "c4",
    description: "shorthand for `++challenge c4`",
    type: "shorthand",
    check: "earlyInfinity",
    sent: [ChallengeCommand.command.getArgMessage("c4")],
    acceptableArgs: undefined
  })
};
