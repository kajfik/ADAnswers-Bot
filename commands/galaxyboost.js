"use strict";

const functions = require("../functions");

module.exports = {
  number: 5,
  name: "galaxyboost",
  description: "compares the boost from 100 tickspeed upgrades with 0 galaxies and 1 galaxy",
  execute(message) {
    // eslint-disable-next-line max-len
    if (functions.earlyGameCheck(message.channel.id, message) || functions.commonCheck(message.channel.id)) message.channel.send("The top equation shows the power of 0 galaxies and 100 tickspeed upgrades, while the bottom equation shows the power of just 1 galaxy and 100 tickspeed upgrades. The boost is about ~5.8x, and it will only get better! https://i.imgur.com/X026AsW.png");
    else message.channel.send("This command only works in early game channels or bot commands!"); 
  }
};