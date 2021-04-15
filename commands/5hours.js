/* eslint-disable max-len */
"use strict";
const { Command } = require("discord.js-commando");

module.exports = {
  number: 1,
  name: "5hours",
  description: "Explains the long-standing 5 hours joke",

  execute(message) {
    message.channel.send(`The 5 hours joke is a reference to an even older joke from a time when AD updates were quite frequent. As a response to that, Acamaeda made a news message suggestion: "Antimatter Dimensions: the next update is always 5 hours away. Always." and the rest is history.`);
  }
};