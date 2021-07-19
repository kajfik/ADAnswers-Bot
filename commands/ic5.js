/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");
const ChallengeCommand = require("./challenge");

module.exports = {
  command: new Command({
    number: 7,
    name: "ic5",
    description: "shorthand for `++challenge ic5`",
    type: "shorthand",
    check: "ic4/5",
    sent: [ChallengeCommand.command.getArgMessage("ic5")],
  })
};
