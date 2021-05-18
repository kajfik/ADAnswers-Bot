/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 3,
  name: "161or162",
  description: "Early Eternity command. Explains whether to chose TS161 or TS162",
  execute(message) {
    if (functions.earlyEternityCheck(message.channel.id, message)) {
      message.channel.send(`Before completing EC2 at least once, TS161 is better mathematically. They essentially give the same effect, but TS161's effect is more immediate.`);
    } else {
      message.channel.send(`This command only works in the early eternity channels, bot commands, or the common channels! Use \`++channels\` to see a channel list.`);
    }
  }
};
