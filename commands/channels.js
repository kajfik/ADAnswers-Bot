"use strict";

// This command still needs functions because creating the channel message is done in functions.js
// It's easier to let it happen here than creating a special case for it in the execute method
// of the command class.
const { Command } = require("../classes/Command");
const functions = require("../functions");

module.exports = {
  command: new Command({
    number: 6,
    name: "channels",
    description: "Sends a list of channels and their ids/part of game progress",
    check: "botCommands",
    acceptableArgs: undefined,
    sent: [functions.getMessage("channel")]
  }),
};