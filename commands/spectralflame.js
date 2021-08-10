/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 69,
    name: "spectralflame",
    description: "spec!",
    check: "botCommandsCheck",
    sent: [`spec is a really cool dude who does stuff! he's been a good friend of mine for a a few years now. he also is really fuckin educated on some physics stuff, so he's got that going for him.`]
  })
};