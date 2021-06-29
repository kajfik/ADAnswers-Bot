/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 3,
  name: "respec",
  description: "Describes what respec studies does",
  // eslint-disable-next-line no-unused-vars
  execute(message, _a, id) {
    if (functions.earlyEternityCheck(id, message)) message.channel.send(`It resets your time studies and refunds all the TT when you next eternity`);
    else message.channel.send("This command can only be used in common channels, bot commands, or early eternity channels!");
  }
};