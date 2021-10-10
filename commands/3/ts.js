/* eslint-disable max-len */
"use strict";

const { TimeStudyApplicationCommand } = require("../../classes/ApplicationCommand/TimeStudyApplicationCommand");
const StudyTreeCommand = require("./studytree");

module.exports = {
  command: new TimeStudyApplicationCommand({
    number: 6,
    name: "ts",
    description: "shorthand for `/studytree`",
    type: "shorthand",
    check: "studyTreeCheck",
    sent: undefined,
    acceptableArgs: [["Any number"], ["active", "passive", "idle"]],
    getArgMessage(args) {
      return StudyTreeCommand.command.getArgMessage(args);
    },
    argInfo: {
      tt: { key: "theorems", type: "number" },
      path: { key: "path", type: "string" },
    },
    ephemeral: true
  })
};