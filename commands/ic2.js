/* eslint-disable max-len */
"use strict";

const { TimeStudyCommand } = require("../classes/TimeStudyCommand");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new TimeStudyCommand({
    number: 7,
    name: "ic2",
    description: "shorthand for `++challenge ic2`",
    type: "shorthand",
    check: "breakCheck",
    sent: [ChallengeCommand.command.getArgMessage(["ic2"])],
  })
};
