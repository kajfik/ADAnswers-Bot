/* eslint-disable max-len */
"use strict";

const config = require("../config.json");

module.exports = {
  number: 1,
  name: "161or162",
  description: "Early Eternity command. Explains whether to chose TS161 or TS162",
  execute(message) {
    if (config.ids.earlyEternity.includes(message.channel.id) || config.ids.common.includes(message.channel.id) || config.ids.botCommands.includes(message.channel.id)) {
      message.channel.send(`Before completing EC2 at least once, TS161 is better mathematically. They essentially give the same effect, but TS161's effect is more immediate.`);
    } else {
      message.channel.send(`This command only works in <#${config.earlyEternity[0]}> or the common channels! Use \`++channels\` to see a channel list.`);
    }
  }
};