/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "commands",
    number: 6,
    description: "sends a link to the website with all commands",
    check: "botCommands",
    sent: ["https://earthernsence.github.io/ADAnswers-Bot/docs/"]
  }),
};