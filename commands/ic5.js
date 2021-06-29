/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new classes.com({
    number: 7,
    name: "ic5",
    description: "shorthand for `++challenge ic5`",
    type: "shorthand",
    check: "breakCheck",
    sent: [ChallengeCommand.command.getArgMessage("ic5")],
    acceptableArgs: undefined
  })
};
