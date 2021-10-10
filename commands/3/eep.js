"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");
const EarlyEternityProgression = require("./earlyeternityprogression");

module.exports = {
  command: new ApplicationCommand({
    name: "eep",
    number: 3,
    type: "shorthand",
    check: "earlyEternityCheck",
    description: "shorthand for /earlyeternityprogression",
    sent: [EarlyEternityProgression.command.sent[0]]
  }),
};