/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 1,
    name: "sacrifice",
    description: "describes sacrifice and when to",
    check: "earlyGameCheck",
    sent: [`Sacrifice resets all Antimatter Dimensions besides 8th Dimensions, and in return you get a multiplier based on First Dimensions. This effect stacks, and is reset on DimBoost/Galaxy/Infinity/etc. I recommend saccing after you buy 10 8th dims and the multiplier is >2x`]
  })
};
