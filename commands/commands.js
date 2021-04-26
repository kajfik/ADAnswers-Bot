/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  name: "commands",
  number: 6,
  description: "sends a link to the website with all commands",
  execute(message) {
    if (functions.botCommandsCheck(message.channel.id)) message.channel.send("https://earthernsence.github.io/ADAnswers-Bot/");
    else message.channel.send("This command can only be used in bot commands!");
  }
};