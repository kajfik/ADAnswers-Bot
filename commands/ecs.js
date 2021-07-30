/* eslint-disable max-len */
"use strict";

const { TimeStudyCommand } = require("../classes/TimeStudyCommand");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new TimeStudyCommand({
    number: 7,
    name: "ecs",
    description: "shorthand for `++challenge ecs`",
    type: "shorthand",
    check: "ecsCheck",
    sent: [ChallengeCommand.command.getArgMessage(["ecs"])],
  })
};
