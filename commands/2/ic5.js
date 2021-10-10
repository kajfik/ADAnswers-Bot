/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");
const ChallengeCommand = require("../5/challenge");

module.exports = {
  command: new ApplicationCommand({
    number: 7,
    name: "ic5",
    description: "shorthand for `/challenge ic5`",
    type: "shorthand",
    check: "weirdICsCheck",
    sent: [ChallengeCommand.command.messageObject.ic5],
  })
};
