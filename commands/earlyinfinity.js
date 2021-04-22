/* eslint-disable max-len */
"use strict";

const config = require("../config.json");

module.exports = {
  number: 1,
  name: "earlyinfinity",
  description: "Describes how to progress pre-2x better Galaxies",
  execute(message) {
    const id = message.channel.id;
    if (config.ids.earlyGame[1] === id || config.ids.common.includes(id) || config.ids.botCommands.includes(id)) message.channel.send(`C8 repeatedly until you can afford the Galaxies are twice as effective upgrade, at which point you can do C11 once then continue with normal infinities. Return to the other challenges in any order you like once you get 100 IP and at least all but the last 5 upgrades`);
    else message.channel.send("This command only works in the first Infinity channel, Common channels, or bot commands!");
  }
};