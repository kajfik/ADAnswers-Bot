/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 69,
    name: "omsi",
    description: "omsi!",
    check: "botCommands",
    acceptableArgs: undefined,
    sent: [`omsi is a really cool person! she's done a ton of work for AD and is all around a real neat person.`]
  })
};