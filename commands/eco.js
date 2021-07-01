/* eslint-disable max-len */
"use strict";

const { EternityChallengeOrderCommand } = require("../classes/EternityChallengeOrderCommand");
const EternityChallengeOrder = require("./eternitychallengeorder");

module.exports = {
  command: new EternityChallengeOrderCommand({
    name: "eco",
    number: 6,
    description: "shorthand for ++eternitychallengeorder",
    type: "shorthand",
    check: "ecsCheck",
    sent: ["1x1, 2x1, 1x2, 3x1, 4x1, 5x1, 1x3, 3x2, 2x2, 6x1, 1x4, 3x3, 7x1, 4x2, 4x3, 6x2, 1x5, 5x2, 2x3, 3x4, 7x2, 5x3, 8x1, 3x5, 6x3, 2x4, 5x4, 7x3, 2x5, 5x5, 4x4, 6x4, 7x4, 8x2, 6x5, 4x5, 8x3, 9x1, 9x2, 8x4, 9x3, 9x4, 8x5, 9x5, 10x1, 7x5, 10x2, 10x3, 10x4, 10x5, 11x1, 11x2, 11x3, 11x4, 11x5, 12x1, 12x2, 12x3, 12x4, 12x5"],
    acceptableArgs: ["1x1", "2x1", "1x2", "3x1", "4x1", "5x1", "1x3", "3x2", "2x2", "6x1", "1x4", "3x3", "7x1", "4x2", "4x3", "6x2", "1x5", "5x2", "2x3", "3x4", "7x2", "5x3", "8x1", "3x5", "6x3", "2x4", "5x4", "7x3", "2x5", "5x5", "4x4", "6x4", "7x4", "8x2", "6x5", "4x5", "8x3", "9x1", "9x2", "8x4", "9x3", "9x4", "8x5", "9x5", "10x1", "7x5", "10x2", "10x3", "10x4", "10x5", "11x1", "11x2", "11x3", "11x4", "11x5", "12x1", "12x2", "12x3", "12x4", "12x5"],
    getArgMessage(arg) {
      return EternityChallengeOrder.command.getArgMessage(arg);
    }
  })
};