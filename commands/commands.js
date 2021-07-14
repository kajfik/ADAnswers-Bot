/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "commands",
    number: 6,
    description: "sends a link to the website with all commands",
    check: "botCommands",
    sent: ["https://earthernsence.github.io/ADAnswers-Bot/docs/"]
  }),
};