/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 69,
    name: "spectralflame",
    description: "spec!",
    check: "botCommands",
    sent: [`spec is a really cool dude who does stuff! he's been a good friend of mine for a a few years now. he also is really fuckin educated on some physics stuff, so he's got that going for him.`]
  })
};