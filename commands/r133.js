  
/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 7,
  name: "r133",
  description: "Gives explanation about r133",
  execute(message) {
    if (functions.endgameCheck(message.channel.id, message)) message.channel.send(`Due to eternity milestone 7 you beat ICs as soon as you unlock them. But you don't have the rewards in the first few ticks on a new eternity, because you still need to reach the amount of AM to unlock those ICs.
This achievements grants you those rewards even if you haven't unlocked ICs yet.
However, this achievement reward is pretty much negligible as not having the IC rewards in the first 100ms won't hinder you that much.`);
    else message.channel.send("This command only works in endgame channels, common channels, or bot commands!");
  }
};
