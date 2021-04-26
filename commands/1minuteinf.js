/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 5,
  name: "1minuteinf",
  description: "explains the UI change at infinity in under a minute",
  execute(message) {
    if (functions.earlyGameCheck(message.channel.id)) {
      message.channel.send(`When you infinity in under a minute, the UI changes on the screen. Instead of the Dimensions disappearing, they stay and the Big Crunch button appears on top of them. This is merely visual, and is there to prevent flickering.`);
    } else {
      message.channel.send(`This command only works in the early game channels or the Common channels. Use ++channels to see a list`);
    }
  }
};