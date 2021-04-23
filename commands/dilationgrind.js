/* eslint-disable max-len */
"use strict";

const config = require("../config.json");

module.exports = {
  number: 1,
  name: "dilationgrind",
  description: "sends a message pertaining to reaching dilation",
  execute(message) {
    if (config.ids.endgame.includes(message.channel.id) || config.ids.common.includes(message.channel.id) || config.ids.botCommands.includes(message.channel.id) || config.ids.ecs[1] === message.channel.id) message.channel.send(`If you have 5e9/5b binfs and 1e6/1m eternities, do a long, all evens idle run to get to 13k TTs`);
    else message.channel.send("This command only works in Dilation channels, common channels, the last EC channel, or bot commands!");
  }
};