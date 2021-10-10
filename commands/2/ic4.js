/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");
const ChallengeCommand = require("../5/challenge");

module.exports = {
  command: new ApplicationCommand({
    
    name: "ic4",
    description: "shorthand for `/challenge ic4`",
    type: "shorthand",
    check: "weirdICsCheck",
    sent: [ChallengeCommand.command.messageObject.ic4],
  })
};
