/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "adbonus",
    number: 5,
    description: "Sends ad bonus formulas/multipliers",
    check: true,
    acceptableArgs: undefined,
    sent: [`DT: 2
    EP: min(max(EP^0.01, 1.5), 1e10)
    IP: max(IP^0.01, 2)
    AD: 2`]
  })
};
