/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 69,
  name: "mage",
  description: "mage!",
  execute(message) {
    if (functions.botCommandsCheck(message.channel.id, message)) message.channel.send(`yo! this guy is real cool. does a lot of stuff for the people. became a mod in record time. be like mage.`);
    else message.channel.send("This command only works in bot commands!");
  }
};