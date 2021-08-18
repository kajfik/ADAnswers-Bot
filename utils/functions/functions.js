/* eslint-disable no-negated-condition */
/* eslint-disable no-console */
"use strict";
/* eslint-disable max-len */


// DO NOT TOUCH LIKE HALF OF THIS STUFF IT JUST WORKS LMAOOOOOOOOOOOO
// CONFIG LOOKS LIKE THIS https://i.imgur.com/WuAs6b5.png IF YOU NEED ME TO ADD
// ANYTHING TO IT THAT YOU MAY USE OUTSIDE OF ONE FILE

// This file is mostly just to be a bumdle of the other files in this folder. Made solely for convenience.

const checks = require("./checks");
const message = require("./message");
const misc = require("./misc");

module.exports = {
  getMessage: message.getMessage,
  misc: {
    toNumber: misc.toNumber,
    isUndefined: misc.isUndefined,
    generateChannelMessage: message.generateChannelMessage,
    getBaseLog: misc.getBaseLog,
    noWorkyMessage: message.noWorkyMessage,
  },
  checkObject: {
    "earlyGame": checks.earlyGameCheck,
    "earlyInfinity": checks.earlyInfinityCheck,
    "breakCheck": checks.breakCheck,
    "earlyEternity": checks.earlyEternityCheck,
    "ecsCheck": checks.ecsCheck,
    "ecsPlus": checks.ecsPlusCheck,
    "endgame": checks.endgameCheck,
    "botCommands": checks.botCommandsCheck,
    "e4000": checks.e4000Check,
    "dilationGrind": checks.dilationGrindCheck,
    "bankedInfs": checks.bankedInfsCheck,
    "studyTreeCheck": checks.studytreeCheck,
    "eternityGrinding": checks.eternityGrindingCheck,
    "ic4/5": checks.weirdICsCheck,
    "setCrunchAutoCheck": checks.setCrunchAutoCheck,
    "lateBreakCheck": checks.lateBreakCheck,
    "true": true
  }
};
