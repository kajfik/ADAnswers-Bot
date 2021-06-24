/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    name: "commands",
    number: 6,
    description: "sends a link to the website with all commands",
    check: "botCommands",
    acceptableArgs: undefined,
    sent: ["https://earthernsence.github.io/ADAnswers-Bot/docs/"]
  }),
};