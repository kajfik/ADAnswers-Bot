"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 7,
    name: "slightsmile",
    description: "kaj no",
    check: "botCommands",
    acceptableArgs: undefined,
    sent: ["\u{1F642}"]
  })
};
