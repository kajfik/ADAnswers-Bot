"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "site",
    description: "Says the game site",
    number: 6,
    check: true,
    sent: [`https://ivark.github.io/`],
  }),
};