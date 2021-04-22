/* eslint-disable max-len */
"use strict";

const config = require("../config.json");

module.exports = {
  number: 69,
  name: "earth",
  description: "who i am n shit",
  execute(message) {
    if (config.ids.botCommands.includes(message.channel.id)) message.channel.send(`heyo! it's earth. i aint do much of nothin but i did make some stuff! check out my website at https://earthernsence.github.io/`);
    else message.channel.send(`this command is only allowed in bot commands`);
  }
};