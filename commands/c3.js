"use strict";

const { TimeStudyCommand } = require("../classes/TimeStudyCommand");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new TimeStudyCommand({
    number: 7,
    name: "c3",
    description: "shorthand for `++challenge c3`",
    type: "shorthand",
    check: "earlyInfinity",
    sent: [ChallengeCommand.command.getArgMessage(["c3"])],
  })
};
