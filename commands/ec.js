"use strict";

const { ECApplicationCommand } = require("../classes/ApplicationCommand/ECApplicationCommand");
const EternityChallengeCommand = require("./eternitychallenge");

module.exports = {
  command: new ECApplicationCommand({
    name: "ec",
    number: 6,
    description: "shorthand for /eternitychallenge",
    type: "shorthand",
    check: "ecsCheck",
    sent: undefined,
    acceptableArgs: EternityChallengeCommand.command.acceptableArgs,
    getArgMessage(arg, tree) {
      return EternityChallengeCommand.command.getArgMessage(arg, tree);
    },
    argInfo: {
      ec: { key: "ec", type: "number" },
      completion: { key: "completion", type: "number" },
    },
    ephemeral: true
  })
};