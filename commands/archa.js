/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "archa",
    number: 69,
    description: "archa!",
    check: "botCommands",
    acceptableArgs: undefined,
    sent: [`archa! really cool tester and stuff, real nice guy. there's no way you can hate archa.`]
  })
};