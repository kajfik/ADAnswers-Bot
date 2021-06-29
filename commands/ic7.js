/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new classes.com({
    number: 7,
    name: "ic7",
    description: "shorthand for `++challenge ic7`",
    type: "shorthand",
    check: "breakCheck",
    sent: [ChallengeCommand.command.getArgMessage("ic7")],
    acceptableArgs: undefined
  })
};
