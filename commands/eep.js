"use strict";

const { Command } = require("../classes/Command");
const EarlyEternityProgression = require("./earlyeternityprogression");

module.exports = {
  command: new Command({
    name: "eep",
    number: 3,
    type: "shorthand",
    check: "earlyEternity",
    description: "shorthand for ++earlyeternityprogression",
    acceptableArgs: undefined,
    sent: [EarlyEternityProgression.command.sent[0]]
  }),
};