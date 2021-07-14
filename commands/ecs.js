/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new Command({
    number: 7,
    name: "ecs",
    description: "shorthand for `++challenge ecs`",
    type: "shorthand",
    check: "ecsCheck",
    sent: [ChallengeCommand.command.getArgMessage("ecs")],
  })
};
