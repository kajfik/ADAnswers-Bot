/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 69,
    name: "mage",
    description: "mage!",
    check: "botCommands",
    sent: [`yo! this guy is real cool. does a lot of stuff for the people. became a mod in record time. be like mage.`]
  })
};