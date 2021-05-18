/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 1,
  name: "sacrifice",
  description: "describess sacrifice and when to",
  // eslint-disable-next-line no-unused-vars
  execute(message, _a, id) {
    if (functions.earlyGameCheck(id, message)) message.channel.send(`Sacrifice resets all Antimatter Dimensions besides 8th Dimensions, and in return you get a multiplier based on First Dimensions. This effect stacks, and is reset on DimBoost/Galaxy/Infinity/etc. I recommend saccing after you buy 10 8th dims and the multiplier is >2x`);
    else message.channel.send("This command can only be used in Early Game channels, bot commands, or common channels!");
  }
};
