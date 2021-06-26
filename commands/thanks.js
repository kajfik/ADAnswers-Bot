"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    name: "thanks",
    description: "say thanks",
    number: 7,
    check: true,
    acceptableArgs: undefined,
    sent: ["fuck you afyinee"]
  })
};