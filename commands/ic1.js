/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new Command({
    number: 7,
    name: "ic1",
    description: "shorthand for `++challenge ic1`",
    type: "shorthand",
    check: "breakCheck",
    sent: [ChallengeCommand.command.getArgMessage("ic1")],
    acceptableArgs: undefined
  })
};
