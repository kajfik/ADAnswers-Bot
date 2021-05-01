/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  name: "secondsplit",
  number: 6,
  description: "describes second split paths",
  // eslint-disable-next-line no-unused-vars
  execute(message, _a, id) {
    if (functions.earlyEternityCheck(id, message)) message.channel.send(`
    Passive : Straight up consecutive EP/min farming runs (afk and offline possible). Works out great for only EP/min farming, will beat out idle overnight with mobile offline setup. Drops off hard at the end of this channel but is usable into the next for a bit.
Active : AM + IP + EP farming, focus required. Setup and always watching required but better than passive.
Idle : AM + IP + EP farm only if you treat this as a check in once every 2 hours type game or are unsure how to setup EP/min farm with passive. If you hate Active this will be the way to go as you need those AM+IP TT eventually.`);
    else message.channel.send("this command only works in bot commands, common channels, or early eternity channels!");
  }
};