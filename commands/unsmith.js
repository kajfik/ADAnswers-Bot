/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 7,
  name: "unsmith",
  description: ":unsmith:",
  execute(message) {
    if (functions.botCommandsCheck(message.channel.id, message)) message.channel.send("this command is dedicated to platonic. creator of synergism. love ya. go play synergism at https://pseudo-corp.github.io/SynergismOfficial/");
    else message.channel.send("This is a miscellaneous command and only works in bot commands!");
  }
};
