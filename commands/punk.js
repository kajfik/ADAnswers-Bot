/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 69,
    name: "punk",
    description: "punk?",
    check: "botCommands",
    sent: [`i have never spoken to punk but i really like their modding style`]
  })
};