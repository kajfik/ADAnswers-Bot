"use strict";

const { TimeStudyCommand } = require("../classes/TimeStudyCommand");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new TimeStudyCommand({
    number: 7,
    name: "c9",
    description: "shorthand for `++challenge c9`",
    type: "shorthand",
    check: "earlyInfinity",
    sent: [ChallengeCommand.command.getArgMessage(["c9"])],
  })
};