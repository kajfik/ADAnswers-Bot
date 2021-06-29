"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 7,
    name: "slightsmile",
    description: "kaj no",
    check: "botCommands",
    acceptableArgs: undefined,
    sent: ["\u{1F642}"]
  })
};
