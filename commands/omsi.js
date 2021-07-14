/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 69,
    name: "omsi",
    description: "omsi!",
    check: "botCommands",
    sent: [`omsi is a really cool person! she's done a ton of work for AD and is all around a real neat person.`]
  })
};