/* eslint-disable max-len */
"use strict";

const { ChallengeApplicationCommand } = require("../../classes/ApplicationCommand/ChallengeApplicationCommand");
const { challenges, normalChallenge, infinityChallenge, newChallengeMessageObject, shownFields } = require("../../utils/databases/challenges");

module.exports = {
  command: new ChallengeApplicationCommand({
    name: "challenge",
    description: "Args: all challenges, including `ecs`. Returns a guide for each argument. All of these commands have shorthands as well, f.e `/challenge c9` will return the same result as `/c9`",
    check: "challengeCheck",
    acceptableArgs: Object.keys(newChallengeMessageObject),
    sent: undefined,
    getArgMessage(arg, info) {
      // Efficiency that excites
      if (!info) return newChallengeMessageObject[arg];
      if (arg.startsWith("c")) {
        return normalChallenge(challenges[arg]).setFields(shownFields(arg, info));
      }
      if (arg.startsWith("ic")) {
        return infinityChallenge(challenges[arg]).setFields(shownFields(arg, info));
      }
      return `Unknown arg in command challenge.`;
    },
    messageObject: newChallengeMessageObject,
    argInfo: {
      challenge: {
        key: "challenge",
        type: "string",
      },
      info: {
        key: "info",
        type: "string",
      }
    }
  }),
};
