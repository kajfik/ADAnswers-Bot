/* eslint-disable max-len */
"use strict";

const config = require("../config.json");

module.exports = {
  number: 3,
  name: "unsmith",
  description: ":unsmith:",
  execute(message) {
    if (config.ids.botCommands.includes(message.channel.id)) message.channel.send("this command is dedicated to platonic. creator of synergism. love ya. go play synergism at https://pseudonian.github.io/SynergismOfficial/");
    else message.channel.send("This is a miscellaneous command and only works in bot commands!");
  }
};