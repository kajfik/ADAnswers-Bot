/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    name: "blob",
    number: 69,
    description: "blob",
    check: "botCommands",
    acceptableArgs: undefined,
    sent: ["blob"]
  })
};