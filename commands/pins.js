/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 4,
    name: "pins",
    description: "pins",
    check: true,
    sent: [`pins. read them.`]
  })
};
