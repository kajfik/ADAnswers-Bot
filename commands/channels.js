"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");
// This command still needs functions because creating the channel message is done in functions.js
// It's easier to let it happen here than creating a special case for it in the execute method
// of the command class.
const functions = require("../utils/functions/functions");

module.exports = {
  command: new ApplicationCommand({
    number: 6,
    name: "channels",
    description: "Sends a list of channels and their ids/part of game progress",
    check: "botCommands",
    sent: [functions.getMessage("channel")]
  }),
};