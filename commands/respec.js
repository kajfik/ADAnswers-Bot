/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 3,
    name: "respec",
    description: "Describes what respec studies does",
    check: true,
    acceptableArgs: undefined,
    sent: [`It resets your time studies and refunds all the TT when you next eternity`]
  })
};