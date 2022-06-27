/* eslint-disable max-len */
"use strict";

const { TimeStudyApplicationCommand } = require("../../classes/ApplicationCommand/TimeStudyApplicationCommand");
const ChallengeCommand = require("../5/challenge");

module.exports = {
  command: new TimeStudyApplicationCommand({
    name: "ecs",
    description: "sends link to ninjatsu's EC guide",
    type: "shorthand",
    check: "ecsCheck",
    sent: [ChallengeCommand.command.messageObject.ecs],
    ephemeral: false
  })
};
