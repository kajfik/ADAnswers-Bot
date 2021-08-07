/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new ApplicationCommand({
    number: 7,
    name: "ic4",
    description: "shorthand for `++challenge ic4`",
    type: "shorthand",
    check: "ic4/5",
    sent: [ChallengeCommand.command.messageObject.ic4],
  })
};
