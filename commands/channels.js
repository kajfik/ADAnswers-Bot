"use strict";

const config = require("../config.json");
const functions = require("../functions");

module.exports = {
  number: 6,
  name: "channels",
  description: "Sends a list of channels and their ids/part of game progress",
  execute(message) {
    if (functions.botCommandsCheck(message.channel.id, message)) {
      message.channel.send(functions.getMessage("channel"));
    } else {
      // eslint-disable-next-line max-len
      message.channel.send(`Command ++${this.name} is not allowed in this channel! Use <#${config.ids.botCommands[0]}>`);
    }
  }
};