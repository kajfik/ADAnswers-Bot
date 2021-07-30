/* eslint-disable max-len */
"use strict";

const { TimeStudyCommand } = require("../classes/TimeStudyCommand");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new TimeStudyCommand({
    number: 7,
    name: "ic4",
    description: "shorthand for `++challenge ic4`",
    type: "shorthand",
    check: "ic4/5",
    sent: [ChallengeCommand.command.getArgMessage(["ic4"])],
  })
};
