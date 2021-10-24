/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "adbonus",

    description: "Sends ad bonus formulas/multipliers",
    check: true,
    sent: [`DT: 2
    EP: min(max(EP^0.01, 1.5), 1e10)
    IP: max(IP^0.01, 2)
    AD: 2`]
  })
};
