/* eslint-disable max-len */
"use strict";

const { TimeStudyApplicationCommand } = require("../classes/ApplicationCommand/TimeStudyApplicationCommand");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new TimeStudyApplicationCommand({
    number: 7,
    name: "ecs",
    description: "shorthand for `/challenge ecs`",
    type: "shorthand",
    check: "ecsCheck",
    sent: [ChallengeCommand.command.messageObject.ecs],
  })
};
