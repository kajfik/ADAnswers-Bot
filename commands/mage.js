/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 69,
    name: "mage",
    description: "mage!",
    check: "botCommands",
    acceptableArgs: undefined,
    sent: [`yo! this guy is real cool. does a lot of stuff for the people. became a mod in record time. be like mage.`]
  })
};