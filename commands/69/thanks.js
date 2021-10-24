"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "thanks",
    description: "say thanks",

    check: true,
    sent: ["fuck you afyinee"]
  })
};