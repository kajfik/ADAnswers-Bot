/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 69,
    name: "mage",
    description: "mage!",
    check: "botCommandsCheck",
    sent: [`yo! this guy is real cool. does a lot of stuff for the people. became a mod in record time. be like mage.`]
  })
};