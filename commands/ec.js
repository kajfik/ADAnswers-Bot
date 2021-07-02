"use strict";

const { TimeStudyCommand } = require("../classes/TimeStudyCommand");
const EternityChallengeCommand = require("./eternitychallenge");

module.exports = {
  command: new TimeStudyCommand({
    name: "ec",
    number: 6,
    description: "shorthand for ++eternitychallenge",
    type: "shorthand",
    check: "ecsCheck",
    sent: undefined,
    acceptableArgs: EternityChallengeCommand.command.acceptableArgs,
    getArgMessage(arg) {
      return EternityChallengeCommand.command.getArgMessage(arg);
    }
  })
};