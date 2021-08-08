"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "failec",
    number: 3,
    description: "Describes what ECs you can fail and how/when",
    check: "ecsCheck",
    sent: ["To fail an EC, you must be in either EC4 or 12. Then, fail the condition (in EC4, too many infinities, in EC12, taking too long)."]
  })
};