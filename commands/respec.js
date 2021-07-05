/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 3,
    name: "respec",
    description: "Describes what respec studies does",
    check: true,
    acceptableArgs: undefined,
    sent: [`It resets your time studies and refunds all the TT when you next eternity`]
  })
};