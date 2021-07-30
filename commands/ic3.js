/* eslint-disable max-len */
"use strict";

const { TimeStudyCommand } = require("../classes/TimeStudyCommand");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new TimeStudyCommand({
    number: 7,
    name: "ic3",
    description: "shorthand for `++challenge ic3`",
    type: "shorthand",
    check: "breakCheck",
    sent: [ChallengeCommand.command.getArgMessage(["ic3"])],
  })
};
