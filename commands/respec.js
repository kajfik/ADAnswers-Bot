/* eslint-disable max-len */
"use strict";

const config = require("../config.json");

module.exports = {
  number: 3,
  name: "respec",
  description: "Describes what respec studies does",
  // eslint-disable-next-line no-unused-vars
  execute(message, _a, id) {
    if (config.ids.botCommands.includes(id) || config.ids.common.includes(id) || config.ids.earlyEternity.includes(id)) message.channel.send(`It resets your time studies and refunds all the TT when you next eternity`);
    else message.channel.send("This command can only be used in common channels, bot commands, or early eternity channels!");
  }
};