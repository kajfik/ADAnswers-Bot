/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "blob",
    number: 69,
    description: "blob",
    check: "botCommands",
    acceptableArgs: undefined,
    sent: ["blob"]
  })
};