/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

const infinityGrindingMessageObject = {
  "early": "Crunch autobuyer on 5.1 seconds (because of the reward from 2mi (and for help with attaining this achievement, use `/achievements 2mi`)), and make sure you have TS32 for the extra multiplier based on DimBoosts",
  "late": `INFINITY FARMING: (Do this on long AFKs) ---- EC10 diminishing returns, reach at least 5 billion eventually (achievement)

  Method:
  -Normal IDLE build (Autobuy RG off -- good for EP later, use 225 with full tree ++ achievement at e20,000 replicanti)
               ----OR----
  -PASSIVE (Autobuy RG on -- 11% faster infinities, no EP later, use 226 with full tree -- not recommended before very high EP -- 33ms required)

  -Crunch 5s
  -AutoGalaxy .4s (or .05s with a maximum galaxy count of the highest you reach in under 4.9 seconds)
  -AutoDimboost .1s
  -Get "high" IP before starting`,
};

module.exports = {
  command: new ApplicationCommand({
    name: "infinitygrinding",
    number: 3,
    description: "Args: `early`, `late`. Sends how to grind infinities for each of those time periods. Early is for EC4, late is for banking infinities.",
    acceptableArgs: Object.keys(infinityGrindingMessageObject),
    check: "ecsPlusCheck",
    getArgMessage(arg) {
      return infinityGrindingMessageObject[arg.toLowerCase()];
    },
    argInfo: {
      key: "when",
      type: "string",
    },
    messageObject: infinityGrindingMessageObject,
  })
};
