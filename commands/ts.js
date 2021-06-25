/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");
const StudyTreeCommand = require("./studytree");

module.exports = {
  command: new classes.com({
    number: 6,
    name: "ts",
    description: "shorthand for `++studytree`",
    type: "shorthand",
    check: "studyTreeCheck",
    sent: undefined,
    acceptableArgs: [["Any number"], ["active", "passive", "idle"]],
    getArgMessage(args) {
      return StudyTreeCommand.command.getArgMessage(args);
    }
  })
};