"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "thanks",
    description: "say thanks",
    number: 7,
    check: true,
    sent: ["fuck you afyinee"]
  })
};