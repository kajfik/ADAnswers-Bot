"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");
// This command still needs functions because creating the channel message is done in functions.js
// It's easier to let it happen here than creating a special case for it in the execute method
// of the command class.
const { Message } = require("../../classes/FunctionClasses/Message");

module.exports = {
  command: new ApplicationCommand({

    name: "channels",
    description: "Sends a list of channels and their ids/part of game progress",
    check: "botCommandsCheck",
    sent: [new Message("channel", { name: "channels", args: [], acceptableArgs: [], worky: "botCommands" }).getMessage()]
  }),
};