/* eslint-disable max-len */
"use strict";

const config = require("../config.json");

module.exports = {
  number: 69,
  name: "mage",
  description: "mage!",
  execute(message) {
    if (config.ids.botCommands.includes(message.channel.id)) message.channel.send(`yo! this guy is real cool. does a lot of stuff for the people. became a mod in record time. be like mage.`);
    else message.channel.send("This command only works in bot commands!");
  }
};