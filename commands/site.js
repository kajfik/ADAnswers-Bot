"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "site",
    description: "Says the game site",
    number: 6,
    check: true,
    acceptableArgs: undefined,
    sent: [`https://ivark.github.io/`],
  }),
};