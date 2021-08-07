"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "thanks",
    description: "say thanks",
    number: 7,
    check: true,
    sent: ["fuck you afyinee"]
  })
};