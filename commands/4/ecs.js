/* eslint-disable max-len */
"use strict";

const { TimeStudyApplicationCommand } = require("../../classes/ApplicationCommand/TimeStudyApplicationCommand");
const ChallengeCommand = require("../5/challenge");

module.exports = {
  command: new TimeStudyApplicationCommand({
    
    name: "ecs",
    description: "shorthand for `/challenge ecs`",
    type: "shorthand",
    check: "ecsCheck",
    sent: [ChallengeCommand.command.messageObject.ecs],
    ephemeral: false
  })
};
