/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new classes.com({
    number: 7,
    name: "ecs",
    description: "shorthand for `++challenge ecs`",
    type: "shorthand",
    check: "ecsCheck",
    sent: [ChallengeCommand.command.getArgMessage("ecs")],
    acceptableArgs: undefined
  })
};
